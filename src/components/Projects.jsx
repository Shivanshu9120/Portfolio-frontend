import React, { useEffect, useState } from "react";

// const projectsData = [
//   {
//     img: "Images/club.png",
//     title: "College Club Website",
//     link: "https://optimix-club-frontend.vercel.app",
//     description:
//       "Developed a MERN stack platform with role-based dashboards where Superadmin assigns roles, Admins manage events and notices, and Users register for events requiring approval. Designed a modern UI using React and Tailwind CSS.",
//     github: "https://github.com/Shivanshu9120/OptimixClub_Backend",
//   },
//   {
//     img: "Images/chat.png",
//     title: "Chat Application",
//     link: "https://messenger-eight-gamma.vercel.app",
//     description:
//       "Built a real-time chat app using MERN stack and Socket.io, supporting 1-on-1 chats and group chats. Implemented JWT authentication for security.",
//     github: "https://github.com/Shivanshu9120/Messenger-backend",
//   },
//   {
//     img: "Images/blog.png",
//     title: "Full Stack Blog Website",
//     link: "https://my-blog-app-pbw7-jdqgzmuwq-shivanshu-singhs-projects-3c042d22.vercel.app/",
//     description:
//       "Developed a full-stack blog website using Next.js, focusing on responsive design and dynamic content rendering.",
//     github: "https://github.com/Shivanshu9120/My-blog-app.git",
//   },
//   {
//     img: "Images/gemini.png",
//     title: "Gemini-Clone",
//     link: "https://gemini-clone-psi-kohl.vercel.app/",
//     description:
//       "Developed a responsive React app with a dynamic sidebar and integrated Google Generative AI for real-time interactions.",
//     github: "https://github.com/Shivanshu9120/Gemini-clone",
//   },
//   {
//     img: "Images/weather.png",
//     title: "Weather Prediction App",
//     link: "https://shivanshu9120.github.io/WeatherApp/",
//     description:
//       "Developed a Weather App using HTML, CSS, and JavaScript, fetching real-time data from the OpenWeatherMap API.",
//     github: "https://github.com/Shivanshu9120/WeatherApp.git",
//   },
//   {
//     img: "Images/speech.png",
//     title: "Text to Speech Converter",
//     link: "https://shivanshu9120.github.io/Text-to-speech/",
//     description:
//       "Built a text-to-speech converter using JavaScript with browser-based speech synthesis API for real-time voice output.",
//     github: "https://github.com/Shivanshu9120/Text-to-speech.git",
//   },
// ];

const Projects = () => {
  const [projects, setProjects] = useState([]);
    
  
  useEffect(() => {
      fetch("https://portfolio-backend-5iq0.onrender.com/api/projects") 
        .then((response) => response.json())
        .then((data) => setProjects(data))
        .catch((error) => console.error("Error fetching progress data:", error));
    }, []);
  return (
    <section className="container" id="projects">
      <div className="projects-content">
        <div className="main-title">
          <h2>
            My <span>Projects</span>
            <span className="bg-text">My Projects</span>
          </h2>
        </div>
        <div className="projects">
          {projects.map((project, index) => (
            <div className="project" key={index}>
              <img src={project.img} alt={project.title} />
              <div className="project-text">
                <h4>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h4>
                <p>{project.description}</p>
                <a href={project.link} className="main-btn" target="_blank" rel="noopener noreferrer">
                  <span className="btn-text">Visit Site</span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </span>
                </a>
                <p></p>
                <a href={project.github} className="main-btn" target="_blank" rel="noopener noreferrer">
                  <span className="btn-text">Contribute</span>
                  <span className="btn-icon">
                    <i className="fa-brands fa-github"></i>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
