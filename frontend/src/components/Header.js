import React, { useState } from "react";
import "../styles/Header.css";
import { useNavigate } from 'react-router-dom';
import { useLocation, Link } from "react-router-dom";
import logo from '../images/logo.png';
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { IoDocumentText, IoMenu, IoCreate } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();  
  const location = useLocation();


  const handleLogout = () => {
    localStorage.removeItem('token');
  
    navigate('/home');
  };

  const isDashboardRoute =
    location.pathname === "/dashboard" ||
    location.pathname === "/templates" ||
    location.pathname === "/profile" 
    
  return (
    <header className="header">
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
    </div>

    {isDashboardRoute ? (
      <div
      className="menu-button"
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <IoMenu />
      {menuOpen && (
        <div className="dropdown-menu">
          <ul>
            {location.pathname !== '/dashboard' && (
              <li>
                <Link to="/dashboard"><IoCreate /> Create template</Link>
              </li>
            )}
  
            {location.pathname !== '/templates' && (
              <li>
                <Link to="/templates"><IoDocumentText /> My templates</Link>
              </li>
            )}
  
            {location.pathname !== '/profile' && (
              <li>
                <Link to="/profile"><CgProfile /> My Profile</Link>
              </li>
            )}
  
            <li>
              <a href="#" onClick={handleLogout}><IoMdLogOut /> Log out</a>
            </li>
          </ul>
        </div>
      )}
    </div>
    ) : location.pathname === "/register" ? (
      <Link to="/home" className="home-button">HOME</Link>
    ) : location.pathname === "/login" ? (
      <Link to="/home" className="home-button">HOME</Link>
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
