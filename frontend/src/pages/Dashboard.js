import { useState } from "react";
import "../styles/Dashboard.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import FormStepInfo from "../components/FormStepInfo";
import FormStepFields from "../components/FormStepFields";
import FormStepReview from "../components/FormStepReview";

const Dashboard = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [fields, setFields] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState('');

  
  const handleCreate = async () => {
    try {
      const response = await fetch("https://localhost:8000/api/form-templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, description, fields }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Form created successfully!");
        setName("");
        setDescription("");
        setFields([]);
        setStep(1);
      } else {
        setMessage(data.error || "Failed to create form");
      }
    } catch (error) {
      setMessage("Error creating form");
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">

        <div className="wizard-steps">
          <div className={`step ${step === 1 ? "active" : ""}`}>1. Info</div>
          <div className={`step ${step === 2 ? "active" : ""}`}>2. Fields</div>
          <div className={`step ${step === 3 ? "active" : ""}`}>3. Review</div>
        </div>

        {step === 1 && (
          <FormStepInfo
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            error={error}
            setError={setError}
            setStep={setStep}
          />
        )}

        {step === 2 && (
          <FormStepFields
            label={label}
            setLabel={setLabel}
            type={type}
            setType={setType}
            options={options}
            setOptions={setOptions}
            isRequired={isRequired}
            setIsRequired={setIsRequired}
            fields={fields}
            setFields={setFields}
            setStep={setStep}
          />
        )}

        {step === 3 && (
          <FormStepReview
            name={name}
            description={description}
            fields={fields}
            setStep={setStep}
            handleCreate={handleCreate}
            message={message}
          />
        )}      
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
