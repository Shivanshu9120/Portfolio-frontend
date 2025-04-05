import React, { useEffect, useState } from "react";

// const profiles = [
//   {
//     name: "Leetcode",
//     image: "Images/leetcode.png",
//     link: "https://leetcode.com/u/Shivanshu_018/",
//     iconClass: "fa-brands fa-free-code-camp fa-bounce",
//   },
//   {
//     name: "Github",
//     image: "Images/github (2).png",
//     link: "https://github.com/Shivanshu9120",
//     iconClass: "fab fa-github",
//   },
//   {
//     name: "Linkedin",
//     image: "Images/linkedin.png",
//     link: "https://www.linkedin.com/in/shivanshu-singh-7bb733220/",
//     iconClass: "fa-brands fa-linkedin",
//   },
//   {
//     name: "GeekForGeeks",
//     image: "Images/gfg.png",
//     link: "https://www.geeksforgeeks.org/user/kshatriyas1g55/",
//     iconClass: "fa-brands fa-free-code-camp fa-bounce",
//   },
//   {
//     name: "Vercel",
//     image: "Images/vercel.png",
//     link: "https://vercel.com/shivanshu-singhs-projects-3c042d22",
//     iconClass: "fa-solid fa-square-caret-up",
//   },
//   {
//     name: "HackerRank",
//     image: "Images/hackerrank.png",
//     link: "https://www.hackerrank.com/profile/kshatriyasarkar1",
//     iconClass: "fa-brands fa-hackerrank",
//   },
// ];

// const certificates = [
//   {
//     name: "Web Development",
//     image: "Images/Certificate(1).png",
//     link: "https://drive.google.com/file/d/1armmR7THOHMpl5J1KD5DrpNA2-jOmKtI/view?usp=drive_link",
//   },
//   {
//     name: "CyberSecurity",
//     image: "Images/Certificate.png",
//     link: "https://drive.google.com/file/d/1He4htrUZa7iZErLJItmZG2f9f-K_rsDB/view?usp=drive_link",
//   },
// ];

const Portfolio = () => {
  const [platform, setPlatform] = useState([]);
  const [certificate, setCertificate] = useState([]);
  

  useEffect(() => {
    fetch("https://portfolio-backend-5iq0.onrender.com/api/platform") 
      .then((response) => response.json())
      .then((data) => setPlatform(data))
      .catch((error) => console.error("Error fetching progress data:", error));
    fetch("https://portfolio-backend-5iq0.onrender.com/api/certificate") 
      .then((response) => response.json())
      .then((data) => setCertificate(data))
      .catch((error) => console.error("Error fetching progress data:", error));
  }, []);
  return (
    <section className="container" id="portfolio">
      {/* Profiles Section */}
      <div className="main-title">
        <h2>
          My <span>Profiles</span>
          <span className="bg-text"> Be Code</span>
        </h2>
      </div>
      <p className="port-text">
        GitHub and Vercel showcase projects, foster collaboration, and highlight coding prowess. LeetCode sharpens problem-solving skills. LinkedIn profiles professional experience and connects with peers. In addition, X (formerly Twitter) provides insights into public sentiment and current trends.
      </p>

      <div className="portfolios">
        {platform.map((profile, index) => (
          <div className="portfolio-item" key={index}>
            <div className="image">
              <img src={profile.image} alt={profile.name} />
            </div>
            <div className="hover-items">
              <a href={profile.link} target="_blank" rel="noopener noreferrer" className="icon">
                <h3>{profile.name}</h3>
              </a>
              <div className="icons">
                <a href={profile.link} target="_blank" rel="noopener noreferrer" className="icon">
                  <i className={profile.iconClass}></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Section */}
      <div className="main-title" style={{ marginTop: "3rem" }}>
        <h2>
          My <span>Certificates</span>
          <span className="bg-text">We Certified</span>
        </h2>
      </div>
      <p className="port-text">
        Certifications validate expertise, enhancing credibility and career prospects. They demonstrate proficiency in specific technologies, methodologies, or domains, opening doors to new opportunities and advancement.
      </p>

      <div className="portfolios">
        {certificate.map((cert, index) => (
          <div className="portfolio-item" key={index}>
            <div className="image">
              <img src={cert.image} alt={cert.name} />
            </div>
            <div className="hover-items">
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="icon">
                <h3>{cert.name}</h3>
              </a>
              <div className="icons">
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="icon">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
