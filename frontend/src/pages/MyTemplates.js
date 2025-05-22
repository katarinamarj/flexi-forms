import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyTemplates.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import { FiPlus } from 'react-icons/fi';

const Templates = () => {

  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
    
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 5;
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = filteredTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate);
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);

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
    
  const handleAddTemplate = () => {
    navigate('/dashboard');
  };

  
  return (
    <div>
    <Header />
    <div className="templates-container">
      <div className="templates-header">
        <h2>My Templates</h2>

        <div className="search-and-add">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />

          <button onClick={handleAddTemplate} className="add-template-button">
            <FiPlus className="add-icon" />
            Add Template
          </button>
        </div>
      </div>

      {loading ? (
        <p className="status-message">Loading...</p>
      ) : templates.length === 0 ? (
        <p className="status-message">No templates found.</p>
      ) : filteredTemplates.length === 0 ? (
        <p className="status-message">No results found for your search.</p>
      ) : (
    
      <table className="templates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>URL link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentTemplates.map((template) => (
            <tr key={template.id}>
              <td>{template.name}</td>
              <td>
                {template.link ? (
                  <a href={template.link} target="_blank" rel="noopener noreferrer" className="template-link">
                    {template.link}
                  </a>
                ) : "—"}
              </td>
              <td>
                <div className="button-group">
                   <button
                    className="action-button"
                    onClick={() => navigate(`/form-responses/${template.id}`)}
                  >
                    Responses
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const confirmed = window.confirm("Are you sure you want to delete this template?");
                      if (confirmed) {
                        handleDelete(template.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
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