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
    <div class="home-page">
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
            Our platform allows you to create forms tailored to your specific needs. 
            Choose from a variety of field types. 
            We provide you with a tool for easy and fast data collection.
          </p>
        </div>
        <div className="feature-box">
          <h3>Share via Link</h3>
          <hr />
          <p>
            Easily share your forms with a unique link that can be shared with anyone — team members, clients, or users. 
            With just one click, recipients can access and fill out the form, making collaboration and data collection faster and more efficient.
          </p>
        </div>
        <div className="feature-box">
          <h3>View and Analyze Responses</h3>
          <hr />
          <p>
            All answers are available to you at any time, allowing you to analyze data and generate reports effortlessly. 
            Make informed decisions based on the feedback and answers collected.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
  
export default Home; 