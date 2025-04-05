import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    fetch("https://portfolio-backend-5iq0.onrender.com/api/admin")
      .then((response) => response.json())
      .then((data) => setAdmin(data[0])) // 👈 get the first admin
      .catch((error) => console.error("Error fetching admin data:", error));
  }, []);

  const textArray = admin.textArr || [];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false); // State for theme toggle

  useEffect(() => {
    if (textArray.length === 0 || !textArray[index]) return;

    const typeWriter = () => {
      if (!isDeleting) {
        if (textIndex < textArray[index].length) {
          setText((prev) => prev + textArray[index].charAt(textIndex));
          setTextIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (text.length > 0) {
          setText((prev) => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex(0);
          setIndex((prev) => (prev + 1) % textArray.length);
        }
      }
    };

    const typingTimeout = setTimeout(typeWriter, isDeleting ? 50 : 100);
    return () => clearTimeout(typingTimeout);
  }, [text, textIndex, index, isDeleting, textArray]);

  useEffect(() => {
    // Page navigation controls
    [...document.querySelectorAll(".control")].forEach((button) => {
      button.addEventListener("click", function () {
        document.querySelector(".active-btn").classList.remove("active-btn");
        this.classList.add("active-btn");
        document.querySelector(".active").classList.remove("active");
        document.getElementById(this.dataset.id).classList.add("active");
      });
    });

    // Cleanup event listeners for section change
    return () => {
      [...document.querySelectorAll(".control")].forEach((button) => {
        button.removeEventListener("click", function () {
          document.querySelector(".active-btn").classList.remove("active-btn");
          this.classList.add("active-btn");
          document.querySelector(".active").classList.remove("active");
          document.getElementById(button.dataset.id).classList.add("active");
        });
      });
    };
  }, []); // Empty dependency array ensures this effect runs once

  // Handle theme toggle
  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [isLightMode]);

  return (
    <>
      <header className="container header active" id="home">
        <div className="header-content">
          <div className="left-header">
            <div className="h-shape"></div>
            <div className="image">
              <img src={admin.profilephoto} alt="Profile picture" />
            </div>
          </div>
          <div className="right-header">
            <h1 className="name">
              Hi, I'm <span>{admin.name} </span>
            </h1>

            {/* Typewriter Effect */}
            {textArray.length > 0 && (
              <div
                className="typewriter"
                style={{
                  color: "var(--color-secondary)",
                  fontWeight: 600,
                  fontSize: "40px",
                  height: "50px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {text}
              </div>
            )}

            <p>
              {admin.about}
              <div> Thank you!</div>
            </p>
            <div className="btn-con">
              <a
                href={admin.resumelink}
                target="_blank"
                rel="noopener noreferrer"
                className="main-btn"
              >
                <span className="btn-text">Open Resume</span>
                <span className="btn-icon">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
              </a>
            </div>
            <div className="btn-con" style={{ marginTop: "1rem" }}>
              <Link to="/admin-login" className="main-btn">
                <span className="btn-text">Admin Login</span>
                <span className="btn-icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Controls */}
      <div className="controls">
        <div className="control active-btn" data-id="home">
          <i className="fas fa-home"></i>
        </div>
        <div className="control" data-id="about">
          <i className="fa-regular fa-circle-user fa-flip"></i>
        </div>
        <div className="control" data-id="portfolio">
          <i className="fa-solid fa-medal fa-shake"></i>
        </div>
        <div className="control" data-id="projects">
          <i className="fa-solid fa-diagram-project fa-bounce"></i>
        </div>
        <div className="control" data-id="contact">
          <i className="fa-regular fa-handshake fa-beat" style={{ color: "#fff" }}></i>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <div className="theme-btn" onClick={toggleTheme}>
        <i className="fas fa-adjust"></i>
      </div>
    </>
  );
};

export default Home;
