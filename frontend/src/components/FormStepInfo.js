import "../styles/FormStepInfo.css";

const FormStepInfo = ({ name, setName, description, setDescription, error }) => {
    return (
      <div className="form-container">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="error-container">
            {error && <p className="error-message">Name is required.</p>}
          </div>
        </div>
      </div>
    );
  };
  
export default FormStepInfo;
  