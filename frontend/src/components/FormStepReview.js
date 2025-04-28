import "../styles/FormStepReview.css";

const FormStepReview = ({ name, description, fields, setStep, handleCreate, message, handleDeleteField }) => {
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
        <button onClick={() => setStep(2)}>Back</button>
        <button onClick={handleCreate} className="create-button">Create</button>
      </div>
    );
  };
  
export default FormStepReview;
  