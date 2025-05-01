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

  if (loading) return <p>Loading...</p>;

  if (!form) return <p>Form not found.</p>;

  return (
    <div className="public-form-container">
      <h2>{form.name}</h2>
      <p>{form.description}</p>
      <form onSubmit={handleSubmit}>
      {form.fields.map((field) => (
        <div key={field.id} className="form-group">
          <label>{field.label}</label>

          {field.type === "text" && (
            <input
              type="text"
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            />
          )}

          {field.type === "textarea" && (
            <textarea
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            />
          )}

          {field.type === "number" && (
            <input
              type="number"
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            />
          )}

          {field.type === "checkbox" && field.options && (
            <div>
              {field.options.map((option, index) => (
                <label key={index}>
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
              ))}
            </div>
          )}

          {field.type === "radio" && field.options && (
            <div>
              {field.options.map((option, index) => (
                <label key={index}>
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
              ))}
            </div>
          )}

          {field.type === "dropdown" && field.options && (
            <select
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            >
              <option value="">Select...</option>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {field.type === "date" && (
            <input
              type="date"
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            />
          )}

          {field.type === "time" && (
            <input
              type="time"
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            />
          )}

          {field.type === "email" && (
            <input
              type="email"
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            />
          )}

          {field.type === "password" && (
            <input
              type="password"
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            />
          )}

          {field.type === "url" && (
            <input
              type="url"
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            />
          )}

          {field.type === "phone" && (
            <input
              type="tel"
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(e, field.label)}
              required={field.isRequired}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PublicForm;
