import "../styles/Footer.css"; 
import { FaYoutube, FaLinkedin, FaGithub  } from "react-icons/fa";
import logo from '../logo2.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section logo-container">
          <img src={logo} alt="Logo" className="logoo" />
          <p>Manage all your forms with Flexi Forms. 
            Create, edit, and organize forms on this platform.</p>
        </div>

        <div className="footer-section">
          <h3>Information</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">How the App Works</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><a href="#">Form Creation</a></li>
            <li><a href="#">Data Management</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Integrations</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>+381 999 999 999</p>
          <p>support@flexiforms.com</p>
          <div className="social-icons">
            <a href="https://github.com" ><FaGithub /></a>
            <a href="https://youtube.com"><FaYoutube /></a>
            <a href="https://linkedin.com"><FaLinkedin /></a>
          </div>
        </div>
      </div>
        <p className="footer-bottom">&copy; 2025 Flexi Forms. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
