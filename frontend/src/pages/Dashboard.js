import { useState } from "react";
import "../styles/Dashboard.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

const Dashboard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    try {
      const response = await fetch("https://localhost:8000/api/form-templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Form created successfully!");
        setName("");
        setDescription("");
      } else {
        setMessage(data.error || "Failed to create form");
      }
    } catch (error) {
      setMessage("Error creating form");
      console.error(error);
    }
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
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleCreate}>Create</button>
          {message && <p>{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
