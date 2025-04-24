import "../styles/FormStepReview.css";

const FormStepReview = ({ name, description, fields, setStep, handleCreate, message }) => {
    return (
      <div className="form-container">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Description:</strong> {description}</p>
        <h4>Fields:</h4>
        <ul>
          {fields.map((field, index) => (
            <li key={index}>
              {field.label} ({field.type}) {field.isRequired ? "[required]" : ""} {field.options ? `Options: ${field.options.join(", ")}` : ""}
            </li>
          ))}
        </ul>
        <button onClick={() => setStep(2)}>Back</button>
        <button onClick={handleCreate}>Create</button>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
  export default FormStepReview;
  