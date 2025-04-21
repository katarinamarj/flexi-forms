import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditTemplate.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const EditTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`https://localhost:8000/api/form-templates/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setName(data.name);
          setDescription(data.description || "");
        } else {
          setMessage("Failed to load template");
        }
      } catch (error) {
        setMessage("Error loading template");
        console.error(error);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://localhost:8000/api/form-templates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Form updated successfully!");
        setTimeout(() => navigate("/templates"), 1100);
      } else {
        setMessage(data.error || "Failed to update form");
      }
    } catch (error) {
      setMessage("Error updating form");
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <h2>Edit Form Template</h2>
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
          <button onClick={handleUpdate}>Save</button>
          {message && <p>{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditTemplate;