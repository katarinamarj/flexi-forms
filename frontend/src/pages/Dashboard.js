import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 


const Dashboard = () => {
  
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const response = await fetch("https://localhost:8000/form-templates");
    const data = await response.json();
    setTemplates(data);
  };

  const createTemplate = async () => {
    await fetch("https://localhost:8000/form-templates", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
    });
    setName("");
    setDescription("");
    fetchTemplates();
  };


  return (
  <div>
    <Header />
    
    <div className="dashboard-container">
      <h2>Create Form Template</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          type="text"
          placeholder="Description"
          value={description}
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createTemplate}>Create</button>
      </div>
    </div>



    <Footer />

  </div>
  )
};
  
export default Dashboard; 