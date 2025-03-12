import React from "react";
import "../styles/Login.css"; 
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const Login = () => {

  const navigate = useNavigate();

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
          <form > 
            <div className="input-group">
              <label>username</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>password</label>
              <input type="password" />
            </div>
            <center><button className="login-btn">LOG IN</button></center>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;