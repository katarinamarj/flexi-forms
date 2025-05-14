import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PublicForm.css";

const PublicForm = () => {
  const { id } = useParams(); 
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`https://localhost:8000/api/form-templates/public/${id}`);
        const data = await response.json();
        setForm(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch form", error);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  if (loading) {
    return (
      <div className="pf-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="pf-loading">
        <p>Form not found.</p>
      </div>
    );
  }

  return (
    <div className="pf-container">
      <h2>{form.name}</h2>
      <p>{form.description}</p>
      <form onSubmit={handleSubmit} className="pf-form">
        <p className="pf-required-info">* Fields marked with an asterisk are required.</p>
        {form.fields.map((field) => (
          <div key={field.id} className="pf-question">
            <label>
              {field.label}
              {field.isRequired && <span className="pf-required-star"> *</span>}
            </label>

            {field.type === "text" && (
              <input type="text" value={formData[field.label] || ""} onChange={(e) => handleChange(e, field.label)} required={field.isRequired} />
            )}

            {field.type === "textarea" && (
              <textarea value={formData[field.label] || ""} onChange={(e) => handleChange(e, field.label)} required={field.isRequired} />
            )}

            {field.type === "number" && (
              <input type="number" value={formData[field.label] || ""} onChange={(e) => handleChange(e, field.label)} required={field.isRequired} />
            )}

            {field.type === "checkbox" && field.options && (
              <div className="pf-option-group">
                {field.options.map((option, index) => (
                  <div className="pf-option" key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={formData[field.label]?.includes(option) || false}
                        onChange={(e) => {
                          const prev = formData[field.label] || [];
                          setFormData({
                            ...formData,
                            [field.label]: e.target.checked
                              ? [...prev, option]
                              : prev.filter((o) => o !== option),
                          });
                        }}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {field.type === "radio" && field.options && (
              <div className="pf-option-group">
                {field.options.map((option, index) => (
                  <div className="pf-option" key={index}>
                    <label>
                      <input
                        type="radio"
                        name={field.label}
                        value={option}
                        checked={formData[field.label] === option}
                        onChange={(e) => handleChange(e, field.label)}
                        required={field.isRequired}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {field.type === "dropdown" && field.options && (
              <select value={formData[field.label] || ""} onChange={(e) => handleChange(e, field.label)} required={field.isRequired}>
                <option value="">Select...</option>
                {field.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            )}

            {["date", "time", "email", "password", "url", "phone"].includes(field.type) && (
              <input
                type={field.type === "phone" ? "tel" : field.type}
                value={formData[field.label] || ""}
                onChange={(e) => handleChange(e, field.label)}
                required={field.isRequired}
              />
            )}
          </div>
        ))}
        <div className="pf-submit-wrapper">
          <button type="submit" className="pf-submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PublicForm;
