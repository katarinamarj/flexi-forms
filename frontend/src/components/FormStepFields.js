import "../styles/FormStepFields.css";

const FormStepFields = ({ label, setLabel, type, setType, options, setOptions, isRequired, setIsRequired, fields, setFields, setStep }) => {
    const handleAddField = () => {
      const newField = {
        label,
        type,
        isRequired,
        options: ["checkbox", "radio", "dropdown"].includes(type) ? options.split(",") : null,
      };
      setFields([...fields, newField]);
      setLabel("");
      setType("text");
      setOptions("");
      setIsRequired(false);
    };
  
    return (
      <div className="form-container">
        <label>Label</label>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
        <label>Type</label>
        <div className="button-group-grid">
          {["text", "textarea", "number", "checkbox", "radio", "dropdown", "date", "time", "email", "password", "url", "phone"].map((t) => (
            <button
              key={t}
              type="button"
              className={type === t ? "type-button selected" : "type-button"}
              onClick={() => setType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <label>Options</label>
        <input
          type="text"
          placeholder="Options (comma separated)"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          disabled={!["checkbox", "radio", "dropdown"].includes(type)}
        />
        <label>
          <input
            type="checkbox"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
          />
          Required
        </label>
        <button onClick={handleAddField} className="left">Add Field</button>
        <button onClick={() => setStep(1)}>Back</button>
        <button onClick={() => setStep(3)} disabled={fields.length === 0}>Next</button>
  
        {fields.length > 0 && (
          <table className="fields-table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Type</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index}>
                  <td>{field.label}</td>
                  <td>{field.type}</td>
                  <td>{field.options ? field.options.join(", ") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  
  export default FormStepFields;
  