import React, { useEffect, useState } from "react";

const About = () => {
  const [progress, setProgress] = useState([]);
  const [skill, setSkill] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    fetch("https://portfolio-backend-5iq0.onrender.com/api/progress") // Adjust the API URL as needed
      .then((response) => response.json())
      .then((data) => setProgress(data))
      .catch((error) => console.error("Error fetching progress data:", error));
    fetch("https://portfolio-backend-5iq0.onrender.com/api/skill") // Adjust the API URL as needed
      .then((response) => response.json())
      .then((data) => setSkill(data))
      .catch((error) => console.error("Error fetching progress data:", error));
    fetch("https://portfolio-backend-5iq0.onrender.com/api/timeline") // Adjust the API URL as needed
      .then((response) => response.json())
      .then((data) => setTimeline(data))
      .catch((error) => console.error("Error fetching progress data:", error));
    fetch("https://portfolio-backend-5iq0.onrender.com/api/admin") // Adjust the API URL as needed
      .then((response) => response.json())
      .then((data) => setAdmin(data[0]))
      .catch((error) => console.error("Error fetching progress data:", error));
  }, []);
    
    // const timeline = [
    //     { year: "2022 - Present", title: "C/C++ Programmer", desc: "DSA in C++ offers practical problem-solving skills, strengthens logic, and enhances understanding of memory management and performance optimization." },
    //     { year: "2023 - Present", title: "ReactJs", desc: "I am learning to ace the concepts of ReactJs to enhance my web development skills." },
    //     { year: "2023 - Present", title: "Problem Solver - Geeks for Geeks", desc: "Sharpen coding skills, tackle algorithmic challenges, enhance problem-solving abilities, and prepare for technical interviews." },
    //     { year: "2023 - Present", title: "Development - Frontend Development", desc: "Design user interfaces, implement interactive features, optimize frontend performance, and ensure cross-browser compatibility using HTML, CSS, & JavaScript." },
    //     { year: "2023 - Present", title: "Python Programmer", desc: "Diving into Python for its simplicity and power, I’ve explored everything from automation to machine learning—harnessing its top-tier libraries to craft smart, efficient solutions." },
    //     { year: "2023 - Present", title: "Development - Backend Development", desc: "To be a complete Full Stack Developer, currently I'm in the process of learning Node and DBMS to enhance my backend development skills." },
    //     { year: "2023 - Present", title: "OOPs with JAVA", desc: "Embraced Java to master object-oriented programming, using OOP principles like inheritance and polymorphism to design clean, scalable, and efficient software solutions and looking forward to ace my development skills using Spring Boot." },
    //     { year: "2024 - Present", title: "ML/AI", desc: "Currently, I am Learning the strategies of Machine Learning to have a hold on the emerging technologies and dive into the vast ocean of Artificial Intelligence." },
    //   ]
  return (
    <section className="container about" id="about">
      <div className="main-title">
        <h2>
          About <span>me</span>
          <span className="bg-text">my stats</span>
        </h2>
      </div>
      <div className="about-container">
        <div className="left-about">
          <h4>My Overview</h4>
          <p>
            {admin.about}
            <br />
            I believe that through collaboration, creativity, and continuous learning, we can harness the power of technology to drive positive change in our world.
          </p>
          <div className="btn-con">
            <a
              href="https://drive.google.com/file/d/1CNMkxXm7vq9tJx7s2zcnstVHjDVlcQmY/view?usp=drive_link"
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
        </div>

        {/* Skills Section */}
        <div className="right-about">
          {skill.map((category, index) => (
            <div className="about-item" key={index}>
              <div className="abt-text">
                <p className="large-text">{category.title}</p>
                {category.skills.map((skill, i) => (
                  <p className="small-text" key={i}>{skill}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bars */}
      <div className="about-stats">
        <h4 className="stat-title">My Skills</h4>
        <div className="progress-bars">
          {progress.map((skill, index) => (
            <div className="progress-bar" key={index}>
              <p className="prog-title">{skill.name}</p>
              <div className="progress-con">
                <p className="prog-text">{skill.percentage}%</p>
                <div className="progress">
                  <span className={skill.name.toLowerCase().replace(" ", "-")}></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <h4 className="stat-title">My Timeline</h4>
      <div className="timeline">
        {timeline.map((timeline, index) => (
          <div className="timeline-item" key={index}>
            <div className="tl-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <p className="tl-duration">{timeline.year}</p>
            <h5>{timeline.title}</h5>
            <p>{timeline.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
