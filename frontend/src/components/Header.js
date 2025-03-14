import React, { useState } from "react";
import "../styles/Header.css";
import { useNavigate } from 'react-router-dom';
import { useLocation, Link } from "react-router-dom";
import logo2 from '../logo2.png';
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();  
  const location = useLocation();


  const handleLogout = () => {
    localStorage.removeItem('token');
  
    navigate('/home');
  };

  return (
    <header className="header">
    <div className="logo-container">
      <img src={logo2} alt="Logo" className="logo2" />
    </div>

    {location.pathname === "/dashboard" ? (
      <div
        className="menu-button"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <IoMenu />
        {menuOpen && (
          <div className="dropdown-menu">
            <ul>
              <li><a href="#"><IoDocumentText /> My templates</a></li>
              <li><a href="/register"><CgProfile /> My Profile</a></li>
              <li><a href="#" onClick={handleLogout}><IoMdLogOut /> Log out</a></li>
            </ul>
          </div>
        )}
      </div>
    ) : location.pathname === "/register" ? (
      <Link to="/login" className="auth-button">LOGIN</Link>
    ) : location.pathname === "/login" ? (
      <Link to="/register" className="auth-button">REGISTER</Link>
    ) : location.pathname === "/" || location.pathname.startsWith("/home") ? (
      <div className="auth-buttons">
        <Link to="/login" className="auth-button">LOGIN</Link>
        <Link to="/register" className="auth-button">REGISTER</Link>
      </div>
    ) : null}
  </header>
);
};

export default Header;
