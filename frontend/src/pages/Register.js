import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

const RegisterPage = () => {

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
         localStorage.setItem("token", data.token);
         navigate("/templates");
      } else {
          setError(data.message);
      }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
    <div className="register-container">
      <Header />
    <div className="register-form">
      <h1>Create an account</h1>
      <form onSubmit={handleRegister}>
      <div className="input-group">
          <label>full name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>email</label>
          <input
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="input-group">
          <label>username</label>
          <input
            type="text"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
        <div className="input-group">
          <label>password</label>
          <input
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <div className="reg-button-container">
          <p>
            <a href="/login" className="login-link">Already have an account? Log in.</a>
          </p>
          <button className="reg-btn">REGISTER</button>
          <p className={`errorMessage ${error ? "visible" : "hidden"}`}>{error}</p>
        </div>
      </form>
    </div>
      <Footer />
      </div>
    );
  };
  
  export default RegisterPage; 
  