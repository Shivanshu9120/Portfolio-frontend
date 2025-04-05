import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [admin, setAdmin] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // 🟡 Fetch admin on mount
  useEffect(() => {
    fetch("https://portfolio-backend-5iq0.onrender.com/api/admin")
      .then((response) => response.json())
      .then((data) => setAdmin(data[0])) // only taking the first admin
      .catch((error) => console.error("Error fetching admin data:", error));
  }, []);

  const contact = admin.contactInfo || []; // ✅ Prevent .map error if undefined

  // 🟡 Handle form changes
  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    const key = placeholder.toLowerCase().includes("name")
      ? "name"
      : placeholder.toLowerCase().includes("email")
      ? "email"
      : placeholder.toLowerCase().includes("subject")
      ? "subject"
      : "message";

    setFormData({ ...formData, [key]: value });
  };

  // 🟡 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://portfolio-backend-5iq0.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been successfully sent.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.error || "Failed to send message. Please try again!",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <section className="container contact" id="contact">
      <div className="contact-container">
        <div className="main-title">
          <h2>
            Contact <span>Me</span>
            <span className="bg-text">Contact</span>
          </h2>
        </div>

        <div className="contact-content-con">
          {/* Left Contact */}
          <div className="left-contact">
            <h4>Contact me here</h4>
            <p>
              • Collaboration knows no bounds, it's the bridge to boundless achievement. <br />
              • Hand in hand, we write the story of success through collaboration.
            </p>

            <div className="contact-info">
              {contact.map((item, index) => (
                <div className="contact-item" key={index}>
                  <div className="icon">
                    <i className={item.icon}></i>
                    <span>{item.label}:</span>
                  </div>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="contact-icons">
              <div className="contact-icon">
                {[
                  { link: "https://leetcode.com/u/Shivanshu_018/", icon: "fa-solid fa-code" },
                  { link: "https://www.linkedin.com/in/shivanshusingh-7bb733220/", icon: "fa-brands fa-linkedin" },
                  { link: "https://github.com/Shivanshu9120", icon: "fab fa-github" },
                  { link: "https://twitter.com/Shivaanshusingh", icon: "fab fa-twitter" },
                ].map((social, index) => (
                  <a href={social.link} target="_blank" rel="noopener noreferrer" key={index}>
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="right-contact">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-control i-c-2">
                <input type="text" required placeholder="YOUR NAME" value={formData.name} onChange={handleChange} />
                <input type="email" required placeholder="YOUR EMAIL" value={formData.email} onChange={handleChange} />
              </div>
              <div className="input-control">
                <input type="text" required placeholder="ENTER SUBJECT" value={formData.subject} onChange={handleChange} />
              </div>
              <div className="input-control">
                <textarea cols="15" rows="12" placeholder="Message Here..." value={formData.message} onChange={handleChange}></textarea>
              </div>
              <div className="btn-con">
                <button type="submit" className="main-btn">
                  <span className="btn-text">SUBMIT</span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-up-right-from-square"></i>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
