import "../styles/FormStepInfo.css";

const FormStepInfo = ({ name, setName, description, setDescription, error, setError, setStep }) => {
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
          <button onClick={() => {
            if (!name.trim()) {
              setError('Name is required');
            } else {
              setError('');
              setStep(2);
            }
          }} className="button1">Next</button>
  
          {error && <p className="error-message">Name is required.</p>}
        </div>
      </div>
    );
  };
  
  export default FormStepInfo;
  