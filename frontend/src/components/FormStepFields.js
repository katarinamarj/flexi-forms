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
      <div className="fields-container">
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
        {["checkbox", "radio", "dropdown"].includes(type) && (
        <>
         <label>Enter options separated by commas</label>
         <textarea
          type="text"
          placeholder="option, option, option..."
          value={options}
          onChange={(e) => setOptions(e.target.value)}
         />
        </>
         )}
        <div className="select-row">
          <label htmlFor="required">Required</label>
          <select
            id="required"
            className="styled-select"
            value={isRequired ? "yes" : "no"}
            onChange={(e) => setIsRequired(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="button-row">
          <button onClick={() => setStep(1)}>Back</button>
          <button onClick={handleAddField}>Add Field</button>
          <button onClick={() => setStep(3)} disabled={fields.length === 0}>Next</button>
        </div>
      </div>
    );
  };
  
  export default FormStepFields;
  