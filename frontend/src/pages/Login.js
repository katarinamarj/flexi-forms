import React, { useState } from "react";
import "../styles/Login.css"; 
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

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

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
    <img src={logo} alt="Logo" className="logo" />

      <div className="left-side">
      <h1>Welcome to Flexi Forms</h1>
        <center><h2>New to our platform?<br/> Creating an account is quick and easy!<br/>Join us in just a few steps.</h2></center>
        <button className="signup-btn" onClick={goToRegister}>REGISTER</button>
      </div>

      <div className="right-side">
        <div className="login-box">
          <h1>Log in</h1>
          <h5>Please enter your details</h5>
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
                <button className="login-btn">LOG IN</button>
                <p className={`error ${error ? "visible" : "hidden"}`}>{error}</p>
             </div>          
             </form>
        </div>
      </div>
    </div>
  );
};

export default Login;