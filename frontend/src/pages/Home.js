import "../styles/Home.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import homeImage from "../images/home-image.png";
import homeImage2 from "../images/home-image2.png";

const Home = () => {

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  const images = [homeImage, homeImage2]; 
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="home-page">
      <Header />

      <div className="home-image-container">
        <button className="prev-button" onClick={prevSlide}>
          ❮
        </button>
        <img src={images[currentIndex]} alt="Slideshow" className="home-image" />
        <button className="next-button" onClick={nextSlide}>
          ❯
        </button>
      </div>

      <div className="home-content">
        <p>Welcome to our platform! Experience seamless form creation and management, <br/>designed for your convenience and efficiency. Start today!</p>
        <button className="get-started-button" onClick={goToRegister}> Get started ❯❯
        </button>
      </div>

      <div className="features-container">
        <div className="feature-box">
          <h3>Fully Customizable</h3>
          <hr />
          <p>
          Our platform allows you to create forms that are fully tailored to your specific needs. 
          You can choose from a variety of field types to shape the form according to your requirements.
          Whether it's a simple survey or a more complex form, our tool provides an intuitive and efficient solution for quickly collecting and analyzing data.
          </p>
        </div>
        <div className="feature-box">
          <h3>Share via Link</h3>
          <hr />
          <p>
          Easily share your forms through a unique link that can be sent to anyone—team members, clients, or users. 
          With just one click, recipients can access and complete the form without needing to sign in. 
          This functionality simplifies collaboration and ensures efficient data collection, speeding up the process of analysis and decision-making.
          </p>
        </div>
        <div className="feature-box">
          <h3>View Responses</h3>
          <hr />
          <p>
          All responses are available to you in real time, allowing for detailed analysis of the collected data. 
          Our platform helps you quickly generate reports and make informed decisions based on user feedback. 
          No matter the volume of data, you can easily filter, group, and utilize it to improve your services or products.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
  
export default Home; 