import React, { useState } from "react";
import "../styles/Login.css"; 
import { useNavigate } from 'react-router-dom';

import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); 
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };


  return (
  <div >
    <Header />
  <div className="login-container">
    <div className="login-form">
      <h1>Welcome back</h1>
      <h3>Please enter your details</h3>
      <form onSubmit={handleLogin}>
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
        <div className="button-container">
          <p>
            <a href="/register" className="register-link">Register if you don't have an account</a>
          </p>
          <button className="login-btn">LOG IN</button>
          <p className={`error ${error ? "visible" : "hidden"}`}>{error}</p>
        </div>
      </form>
    </div>
  </div>

  <Footer />
</div>
  );
};

export default Login;