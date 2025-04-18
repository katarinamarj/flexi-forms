import { useEffect, useState } from "react";
import "../styles/MyTemplates.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

const Templates = () => {

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
    
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 5;
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = templates.slice(indexOfFirstTemplate, indexOfLastTemplate);
  const totalPages = Math.ceil(templates.length / templatesPerPage);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("https://localhost:8000/api/form-templates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }
    
      const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:8000/api/form-templates/${id}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    
      if (!response.ok) {
        throw new Error("Failed to delete template");
      }
    
      setTemplates((prevTemplates) => prevTemplates.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };
    
  
  return (
    <div>
    <Header />
    <div className="templates-container">
        <h2>My Templates</h2>

        {loading ? (
          <p>Loading...</p>
        ) : templates.length === 0 ? (
          <p>No templates found.</p>
        ) : (
          <table className="templates-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTemplates.map((template) => (
                <tr key={template.id}>
                  <td>{template.name}</td>
                  <td>{template.description || "—"}</td>
                  <td>
                    <button className="action-button">Edit</button>
                    <button className="action-button" onClick={() => handleDelete(template.id)}>Delete</button>
                    <button className="action-button">Preview</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>    
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
        {index + 1}
        </button>
      ))}
    </div>
    <Footer />
    </div>
  )
};

export default Templates;