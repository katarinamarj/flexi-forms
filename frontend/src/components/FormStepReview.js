import { useState, useEffect } from "react";
import "../styles/FormStepReview.css";
import Modal from "./Modal"; 

const FormStepReview = ({ name, description, fields, handleCreate, handleDeleteField, publicLink }) => {
    const [showModal, setShowModal] = useState(false);
    const [createClicked, setCreateClicked] = useState(false);

    const handleCreateClick = () => {
      handleCreate();          
      setCreateClicked(true);  
    };

    useEffect(() => {
      if (createClicked && publicLink) {
        setShowModal(true);
        setCreateClicked(false); 
      }
    }, [publicLink, createClicked]);

    const handleCloseModal = () => {
      window.location.reload(); 
    };
  
    return (
      <div className="form-container">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Description:</strong> {description}</p>
        <h4>Fields:</h4>
        <table className="fields-table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Type</th>
            <th>Options</th>
            <th>Required</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <td>{field.label}</td>
              <td>{field.type}</td>
              <td>{field.options ? field.options.join(", ") : "-"}</td>
              <td>{field.isRequired ? "yes" : "no"}</td>
              <td>
                <button className="action-button delete" onClick={() => handleDeleteField(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        <button onClick={handleCreateClick} className="create-button">Create</button>
        {showModal && publicLink && (
        <Modal publicLink={publicLink} onClose={handleCloseModal} />
        )}
      </div>
    );
  };
  
export default FormStepReview;
  