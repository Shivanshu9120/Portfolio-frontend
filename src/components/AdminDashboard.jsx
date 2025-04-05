// AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newSubSkills, setNewSubSkills] = useState("");
  const [editSkillId, setEditSkillId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubSkills, setEditSubSkills] = useState("");
  const [progressList, setProgressList] = useState([]);
  const [newProgressName, setNewProgressName] = useState("");
  const [newProgressPercent, setNewProgressPercent] = useState("");
  const [editProgressId, setEditProgressId] = useState(null);
  const [editProgressName, setEditProgressName] = useState("");
  const [editProgressPercent, setEditProgressPercent] = useState("");
  const [timelineList, setTimelineList] = useState([]);
  const [newTimeline, setNewTimeline] = useState({ year: "", title: "", desc: "" });
  const [editTimelineId, setEditTimelineId] = useState(null);
  const [editTimeline, setEditTimeline] = useState({ year: "", title: "", desc: "" });
  const [platforms, setPlatforms] = useState([]);
  const [newPlatform, setNewPlatform] = useState({name: "",link: "",iconClass: "",image: null,});
  const [editPlatformId, setEditPlatformId] = useState(null);
  const [editPlatformData, setEditPlatformData] = useState({name: "",link: "",iconClass: "",image: null,});
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({name: '',image: null,link: '',});
  const [editCertificateId, setEditCertificateId] = useState(null);
  const [editCertificateData, setEditCertificateData] = useState({name: '',image: null,link: '',});
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({img: null,title: '',link: '',description: '',github: '',});
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProjectData, setEditProjectData] = useState({img: null,title: '',link: '',description: '',github: '',});



  const navigate = useNavigate();

  const fetchLoggedInAdmin = async () => {
    const adminId = localStorage.getItem("adminId");
    if (!adminId) return navigate("/admin-login");

    try {
      const res = await axios.get(`https://portfolio-backend-5iq0.onrender.com/api/admin/${adminId}`);
      setAdmin(res.data);
      setFormData(res.data);
      setContactInfo(res.data.contactInfo || []);
    } catch (err) {
      console.error("Error fetching admin:", err);
      navigate("/admin-login");
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await axios.get("https://portfolio-backend-5iq0.onrender.com/api/skill");
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    navigate("/admin-login");
  };

  const handleDeleteAdmin = async () => {
    const result = await Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://portfolio-backend-5iq0.onrender.com/api/admin/${admin._id}`);
        Swal.fire("Deleted!", "Admin account has been deleted.", "success");
        handleLogout();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete account", "error");
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setFormData(admin);
    setContactInfo(admin.contactInfo || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password || "default123");
      data.append("about", formData.about);
      data.append("resumelink", formData.resumelink);
      data.append("textArr", JSON.stringify(formData.textArr || []));
      data.append("contactInfo", JSON.stringify(contactInfo));
      if (imageFile) data.append("profilephoto", imageFile);

      const res = await axios.put(`https://portfolio-backend-5iq0.onrender.com/api/admin/${admin._id}`, data);
      Swal.fire("Success", "Admin profile updated!", "success");
      setAdmin(res.data.updated);
      setIsEditing(false);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "Update failed", "error");
    }
  };

  const handleContactChange = (index, field, value) => {
    const updated = [...contactInfo];
    updated[index][field] = value;
    setContactInfo(updated);
  };

  const addContactField = () => {
    setContactInfo([...contactInfo, { icon: "", label: "", value: "" }]);
  };

  const removeContactField = (index) => {
    const updated = [...contactInfo];
    updated.splice(index, 1);
    setContactInfo(updated);
  };

  const addSkill = async () => {
    if (!newTitle.trim()) return;
    const subSkills = newSubSkills.split(",").map(s => s.trim()).filter(s => s);
    try {
      const res = await axios.post("https://portfolio-backend-5iq0.onrender.com/api/skill", {
        title: newTitle,
        skills: subSkills
      });
      setSkills([...skills, res.data]);
      setNewTitle("");
      setNewSubSkills("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add skill category", "error");
    }
  };

  const deleteSkill = async (id) => {
    try {
      await axios.delete(`https://portfolio-backend-5iq0.onrender.com/api/skill/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete skill", "error");
    }
  };

  const updateSkill = async () => {
    const updatedSkills = editSubSkills.split(",").map(s => s.trim()).filter(s => s);
    try {
      const res = await axios.put(`https://portfolio-backend-5iq0.onrender.com/api/skill/${editSkillId}`, {
        title: editTitle,
        skills: updatedSkills,
      });
      setSkills(skills.map(s => s._id === editSkillId ? res.data : s));
      setEditSkillId(null);
      setEditTitle("");
      setEditSubSkills("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update skill", "error");
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await axios.get("https://portfolio-backend-5iq0.onrender.com/api/progress");
      setProgressList(res.data);
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };
  
  const addProgress = async () => {
    if (!newProgressName.trim() || !newProgressPercent) return;
    try {
      const res = await axios.post("https://portfolio-backend-5iq0.onrender.com/api/progress", {
        name: newProgressName,
        percentage: parseInt(newProgressPercent),
      });
      setProgressList([...progressList, res.data]);
      setNewProgressName("");
      setNewProgressPercent("");
    } catch (err) {
      console.error("Error adding progress:", err);
      Swal.fire("Error", "Failed to add progress", "error");
    }
  };
  
  const updateProgress = async () => {
    try {
      const res = await axios.put(`https://portfolio-backend-5iq0.onrender.com/api/progress/${editProgressId}`, {
        name: editProgressName,
        percentage: parseInt(editProgressPercent),
      });
      setProgressList(progressList.map((p) => (p._id === editProgressId ? res.data : p)));
      setEditProgressId(null);
      setEditProgressName("");
      setEditProgressPercent("");
    } catch (err) {
      console.error("Error updating progress:", err);
      Swal.fire("Error", "Failed to update progress", "error");
    }
  };
  
  const deleteProgress = async (id) => {
    try {
      await axios.delete(`https://portfolio-backend-5iq0.onrender.com/api/progress/${id}`);
      setProgressList(progressList.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting progress:", err);
      Swal.fire("Error", "Failed to delete progress", "error");
    }
  };
  
  const fetchTimeline = async () => {
    try {
      const res = await axios.get("https://portfolio-backend-5iq0.onrender.com/api/timeline");
      setTimelineList(res.data);
    } catch (err) {
      console.error("Error fetching timeline:", err);
    }
  };
  
  const addTimeline = async () => {
    const { year, title, desc } = newTimeline;
    if (!year || !title || !desc) return;
  
    try {
      const res = await axios.post("https://portfolio-backend-5iq0.onrender.com/api/timeline", newTimeline);
      setTimelineList([...timelineList, res.data]);
      setNewTimeline({ year: "", title: "", desc: "" });
    } catch (err) {
      console.error("Error adding timeline:", err);
      Swal.fire("Error", "Failed to add timeline", "error");
    }
  };
  
  const updateTimeline = async () => {
    try {
      const res = await axios.put(`https://portfolio-backend-5iq0.onrender.com/api/timeline/${editTimelineId}`, editTimeline);
      setTimelineList(timelineList.map((t) => t._id === editTimelineId ? res.data : t));
      setEditTimelineId(null);
      setEditTimeline({ year: "", title: "", desc: "" });
    } catch (err) {
      console.error("Error updating timeline:", err);
      Swal.fire("Error", "Failed to update timeline", "error");
    }
  };
  
  const deleteTimeline = async (id) => {
    try {
      await axios.delete(`https://portfolio-backend-5iq0.onrender.com/api/timeline/${id}`);
      setTimelineList(timelineList.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting timeline:", err);
      Swal.fire("Error", "Failed to delete timeline", "error");
    }
  };

  const fetchPlatforms = async () => {
    try {
      const res = await axios.get("https://portfolio-backend-5iq0.onrender.com/api/platform");
      setPlatforms(res.data);
    } catch (err) {
      console.error("Error fetching platforms:", err);
    }
  };
  
  const addPlatform = async () => {
    const formData = new FormData();
    formData.append("name", newPlatform.name);
    formData.append("link", newPlatform.link);
    formData.append("iconClass", newPlatform.iconClass);
    if (newPlatform.image) formData.append("image", newPlatform.image);
  
    try {
      const res = await axios.post("https://portfolio-backend-5iq0.onrender.com/api/platform", formData);
      setPlatforms([...platforms, res.data]);
      setNewPlatform({ name: "", link: "", iconClass: "", image: null });
    } catch (err) {
      console.error("Error adding platform:", err);
    }
  };
  
  const updatePlatform = async () => {
    const formData = new FormData();
    formData.append("name", editPlatformData.name);
    formData.append("link", editPlatformData.link);
    formData.append("iconClass", editPlatformData.iconClass);
    if (editPlatformData.image) formData.append("image", editPlatformData.image);
  
    try {
      const res = await axios.put(`https://portfolio-backend-5iq0.onrender.com/api/platform/${editPlatformId}`, formData);
      setPlatforms(platforms.map(p => p._id === editPlatformId ? res.data : p));
      setEditPlatformId(null);
      setEditPlatformData({ name: "", link: "", iconClass: "", image: null });
    } catch (err) {
      console.error("Error updating platform:", err);
    }
  };
  
  const deletePlatform = async (id) => {
    try {
      await axios.delete(`https://portfolio-backend-5iq0.onrender.com/api/platform/${id}`);
      setPlatforms(platforms.filter(p => p._id !== id));
    } catch (err) {
      console.error("Error deleting platform:", err);
    }
  };

  const fetchCertificates = async () => {
    const res = await fetch('https://portfolio-backend-5iq0.onrender.com/api/certificate');
    const data = await res.json();
    setCertificates(data);
  };
  
  const addCertificate = async () => {
    const formData = new FormData();
    formData.append('name', newCertificate.name);
    formData.append('link', newCertificate.link);
    formData.append('image', newCertificate.image);
  
    await fetch('https://portfolio-backend-5iq0.onrender.com/api/certificate', {
      method: 'POST',
      body: formData,
    });
  
    setNewCertificate({ name: '', link: '', image: null });
    fetchCertificates();
  };
  
  const deleteCertificate = async (id) => {
    await fetch(`https://portfolio-backend-5iq0.onrender.com/api/certificate/${id}`, { method: 'DELETE' });
    fetchCertificates();
  };
  
  const updateCertificate = async () => {
    const formData = new FormData();
    formData.append('name', editCertificateData.name);
    formData.append('link', editCertificateData.link);
    if (editCertificateData.image) {
      formData.append('image', editCertificateData.image);
    }
  
    await fetch(`https://portfolio-backend-5iq0.onrender.com/api/certificate/${editCertificateId}`, {
      method: 'PUT',
      body: formData,
    });
  
    setEditCertificateId(null);
    fetchCertificates();
  };
  
  const fetchProjects = async () => {
    const res = await fetch('https://portfolio-backend-5iq0.onrender.com/api/projects');
    const data = await res.json();
    setProjects(data);
  };
  
  const addProject = async () => {
    const formData = new FormData();
    formData.append('img', newProject.img);
    formData.append('title', newProject.title);
    formData.append('link', newProject.link);
    formData.append('description', newProject.description);
    formData.append('github', newProject.github);
  
    await fetch('https://portfolio-backend-5iq0.onrender.com/api/projects', {
      method: 'POST',
      body: formData,
    });
  
    setNewProject({ img: null, title: '', link: '', description: '', github: '' });
    fetchProjects();
  };
  
  const deleteProject = async (id) => {
    await fetch(`https://portfolio-backend-5iq0.onrender.com/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };
  
  const updateProject = async () => {
    const formData = new FormData();
    formData.append('title', editProjectData.title);
    formData.append('link', editProjectData.link);
    formData.append('description', editProjectData.description);
    formData.append('github', editProjectData.github);
    if (editProjectData.img) {
      formData.append('img', editProjectData.img);
    }
  
    await fetch(`https://portfolio-backend-5iq0.onrender.com/api/projects/${editProjectId}`, {
      method: 'PUT',
      body: formData,
    });
  
    setEditProjectId(null);
    fetchProjects();
  };  

  useEffect(() => {
    fetchLoggedInAdmin();
    fetchSkills();
    fetchProgress();
    fetchTimeline();
    fetchPlatforms();
    fetchCertificates();
    fetchProjects();
  }, []);

  if (!admin) return <p className="loading">Loading admin info...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <button className="add-btn" onClick={() => navigate("/add-admin")}>+ Add New Admin</button>

      <div className="admin-card">
        <img
          className="admin-img"
          src={
            imageFile
              ? URL.createObjectURL(imageFile)
              : formData.profilephoto || admin.profilephoto
          }
          alt="Profile"
        />
        <div className="admin-details">
          {isEditing ? (
            <>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input name="about" value={formData.about} onChange={handleChange} placeholder="About" />
              <input name="resumelink" value={formData.resumelink} onChange={handleChange} placeholder="Resume Link" />
              <input
                name="textArr"
                value={formData.textArr?.join(", ") || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    textArr: e.target.value.split(",").map((role) => role.trim()),
                  }))
                }
                placeholder="Roles (comma-separated)"
              />
              <input type="file" accept="image/*" onChange={handleImageChange} />

              <div className="contact-section">
                <h3>Contact Info</h3>
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="contact-item">
                    <input value={info.icon} onChange={(e) => handleContactChange(idx, "icon", e.target.value)} placeholder="Icon class" />
                    <input value={info.label} onChange={(e) => handleContactChange(idx, "label", e.target.value)} placeholder="Label" />
                    <input value={info.value} onChange={(e) => handleContactChange(idx, "value", e.target.value)} placeholder="Value" />
                    <button onClick={() => removeContactField(idx)}>❌</button>
                  </div>
                ))}
                <button className="add-btn" onClick={addContactField}>+ Add Contact</button>
              </div>
            </>
          ) : (
            <>
              <h2>{admin.name}</h2>
              <p><strong>Email:</strong> {admin.email}</p>
              <p><strong>About:</strong> {admin.about}</p>
              <p><strong>Resume:</strong> <a href={admin.resumelink} target="_blank" rel="noreferrer">View Resume</a></p>
              <p><strong>Roles:</strong> {admin.textArr.join(", ")}</p>
              <p><strong>Contact:</strong></p>
              <ul>
                {admin.contactInfo && admin.contactInfo.length > 0 ? (
                  admin.contactInfo.map((info, i) => (
                    <li key={i}>
                      <i className={info.icon}></i> <strong>{info.label}:</strong> {info.value}
                    </li>
                  ))
                ) : (
                  <li>N/A</li>
                )}
              </ul>
            </>
          )}
          <div className="admin-actions">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={handleEditToggle}>Cancel</button>
              </>
            ) : (
              <>
                <button className="edit-btn" onClick={handleEditToggle}>Edit</button>
                <button className="delete-btn" onClick={handleDeleteAdmin}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="skill-card">
        <h2>Manage Skills</h2>

        <div className="skill-input">
          <input type="text" placeholder="Skill Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <input type="text" placeholder="Subskills (comma separated)" value={newSubSkills} onChange={(e) => setNewSubSkills(e.target.value)} />
          <button onClick={addSkill}>Add Skill</button>
        </div>

        <ul className="skill-list">
          {skills.map(skill => (
            <li key={skill._id} className="skill-item">
              {editSkillId === skill._id ? (
                <>
                  <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <input type="text" value={editSubSkills} onChange={(e) => setEditSubSkills(e.target.value)} />
                  <button onClick={updateSkill}>Save</button>
                  <button onClick={() => setEditSkillId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>{skill.title}</strong>
                  <ul>
                    {skill.skills?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <button onClick={() => {
                    setEditSkillId(skill._id);
                    setEditTitle(skill.title);
                    setEditSubSkills(skill.skills?.join(", ") || "");
                  }}>Edit</button>
                  <button onClick={() => deleteSkill(skill._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

  <div className="progress-card">
  <h2>Manage Progress</h2>

  <div className="progress-input">
    <input
      type="text"
      placeholder="Progress Name (e.g., Next.js)"
      value={newProgressName}
      onChange={(e) => setNewProgressName(e.target.value)}
    />
    <input
      type="number"
      placeholder="Percentage"
      value={newProgressPercent}
      onChange={(e) => setNewProgressPercent(e.target.value)}
    />
    <button onClick={addProgress}>Add Progress</button>
  </div>

  <ul className="progress-list">
    {progressList.map((item) => (
      <li key={item._id} className="progress-item">
        {editProgressId === item._id ? (
          <>
            <input
              type="text"
              value={editProgressName}
              onChange={(e) => setEditProgressName(e.target.value)}
            />
            <input
              type="number"
              value={editProgressPercent}
              onChange={(e) => setEditProgressPercent(e.target.value)}
            />
            <button onClick={updateProgress}>Save</button>
            <button onClick={() => setEditProgressId(null)}>Cancel</button>
          </>
        ) : (
          <>
            <strong>{item.name}:</strong> {item.percentage}%
            <button
              onClick={() => {
                setEditProgressId(item._id);
                setEditProgressName(item.name);
                setEditProgressPercent(item.percentage);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteProgress(item._id)}>Delete</button>
          </>
        )}
      </li>
    ))}
  </ul>
</div>

<div className="timeline-section">
  <h2>Timeline</h2>

  <div className="timeline-add">
    <input
      type="text"
      placeholder="Year"
      value={newTimeline.year}
      onChange={(e) => setNewTimeline({ ...newTimeline, year: e.target.value })}
    />
    <input
      type="text"
      placeholder="Title"
      value={newTimeline.title}
      onChange={(e) => setNewTimeline({ ...newTimeline, title: e.target.value })}
    />
    <input
      type="text"
      placeholder="Description"
      value={newTimeline.desc}
      onChange={(e) => setNewTimeline({ ...newTimeline, desc: e.target.value })}
    />
    <button onClick={addTimeline}>Add Timeline</button>
  </div>

  <ul className="timeline-list">
    {timelineList.map((item) => (
      <li key={item._id}>
        {editTimelineId === item._id ? (
          <div>
            <input
              value={editTimeline.year}
              onChange={(e) => setEditTimeline({ ...editTimeline, year: e.target.value })}
            />
            <input
              value={editTimeline.title}
              onChange={(e) => setEditTimeline({ ...editTimeline, title: e.target.value })}
            />
            <input
              value={editTimeline.desc}
              onChange={(e) => setEditTimeline({ ...editTimeline, desc: e.target.value })}
            />
            <button onClick={updateTimeline}>Update</button>
            <button onClick={() => setEditTimelineId(null)}>Cancel</button>
          </div>
        ) : (
          <div>
            <strong>{item.year}</strong> - <em>{item.title}</em><br />
            <span>{item.desc}</span>
            <div>
              <button onClick={() => {
                setEditTimelineId(item._id);
                setEditTimeline({ year: item.year, title: item.title, desc: item.desc });
              }}>Edit</button>
              <button onClick={() => deleteTimeline(item._id)}>Delete</button>
            </div>
          </div>
        )}
      </li>
    ))}
  </ul>
</div>

<div className="section">
  <h2>Platform Links</h2>

  {/* Add new platform */}
  <input
    type="text"
    placeholder="Name"
    value={newPlatform.name}
    onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
  />
  <input
    type="text"
    placeholder="Link"
    value={newPlatform.link}
    onChange={(e) => setNewPlatform({ ...newPlatform, link: e.target.value })}
  />
  <input
    type="text"
    placeholder="Icon Class"
    value={newPlatform.iconClass}
    onChange={(e) => setNewPlatform({ ...newPlatform, iconClass: e.target.value })}
  />
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setNewPlatform({ ...newPlatform, image: e.target.files[0] })}
  />
  <button onClick={addPlatform}>Add Platform</button>

  {/* List platforms */}
  {platforms.map((p) => (
    <div key={p._id} className="platform-card">
      <img src={p.image} alt={p.name} height="50" />
      <p>{p.name}</p>
      <a href={p.link} target="_blank" rel="noopener noreferrer">Visit</a>
      <i className={p.iconClass}></i>
      <button onClick={() => {
        setEditPlatformId(p._id);
        setEditPlatformData(p);
      }}>Edit</button>
      <button onClick={() => deletePlatform(p._id)}>Delete</button>
    </div>
  ))}

  {/* Edit platform */}
  {editPlatformId && (
    <div className="edit-platform">
      <h3>Edit Platform</h3>
      <input
        type="text"
        value={editPlatformData.name}
        onChange={(e) => setEditPlatformData({ ...editPlatformData, name: e.target.value })}
      />
      <input
        type="text"
        value={editPlatformData.link}
        onChange={(e) => setEditPlatformData({ ...editPlatformData, link: e.target.value })}
      />
      <input
        type="text"
        value={editPlatformData.iconClass}
        onChange={(e) => setEditPlatformData({ ...editPlatformData, iconClass: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setEditPlatformData({ ...editPlatformData, image: e.target.files[0] })}
      />
      <button onClick={updatePlatform}>Save</button>
      <button onClick={() => setEditPlatformId(null)}>Cancel</button>
    </div>
  )}
</div>


<div className="section">
  <h2>Certificates</h2>

  {/* Add Certificate */}
  <input
    type="text"
    placeholder="Name"
    value={newCertificate.name}
    onChange={(e) =>
      setNewCertificate({ ...newCertificate, name: e.target.value })
    }
  />
  <input
    type="text"
    placeholder="Link"
    value={newCertificate.link}
    onChange={(e) =>
      setNewCertificate({ ...newCertificate, link: e.target.value })
    }
  />
  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setNewCertificate({ ...newCertificate, image: e.target.files[0] })
    }
  />
  <button onClick={addCertificate}>Add Certificate</button>

  {/* List Certificates */}
  {certificates.map((c) => (
    <div key={c._id} className="platform-card">
      <img src={c.image} alt={c.name} height="50" />
      <p>{c.name}</p>
      <a href={c.link} target="_blank" rel="noopener noreferrer">
        View Certificate
      </a>
      <button
        onClick={() => {
          setEditCertificateId(c._id);
          setEditCertificateData(c);
        }}
      >
        Edit
      </button>
      <button onClick={() => deleteCertificate(c._id)}>Delete</button>
    </div>
  ))}

  {/* Edit Certificate */}
  {editCertificateId && (
    <div className="edit-platform">
      <h3>Edit Certificate</h3>
      <input
        type="text"
        value={editCertificateData.name}
        onChange={(e) =>
          setEditCertificateData({
            ...editCertificateData,
            name: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={editCertificateData.link}
        onChange={(e) =>
          setEditCertificateData({
            ...editCertificateData,
            link: e.target.value,
          })
        }
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setEditCertificateData({
            ...editCertificateData,
            image: e.target.files[0],
          })
        }
      />
      <button onClick={updateCertificate}>Save</button>
      <button onClick={() => setEditCertificateId(null)}>Cancel</button>
    </div>
  )}
</div>

<div className="section">
  <h2>Projects</h2>

  {/* Add Project */}
  <input
    type="text"
    placeholder="Title"
    value={newProject.title}
    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
  />
  <input
    type="text"
    placeholder="Live Link"
    value={newProject.link}
    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
  />
  <input
    type="text"
    placeholder="GitHub Link"
    value={newProject.github}
    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
  />
  <input
    type="text"
    placeholder="Description"
    value={newProject.description}
    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
  ></input>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setNewProject({ ...newProject, img: e.target.files[0] })}
  />
  <button onClick={addProject}>Add Project</button>

  {/* List Projects */}
  {projects.map((p) => (
    <div key={p._id} className="platform-card">
      <img src={p.img} alt={p.title} height="50" />
      <h4>{p.title}</h4>
      <p>{p.description}</p>
      <a href={p.link} target="_blank" rel="noopener noreferrer">Live</a> | 
      <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      <button onClick={() => {
        setEditProjectId(p._id);
        setEditProjectData(p);
      }}>Edit</button>
      <button onClick={() => deleteProject(p._id)}>Delete</button>
    </div>
  ))}

  {/* Edit Project */}
  {editProjectId && (
    <div className="edit-platform">
      <h3>Edit Project</h3>
      <input
        type="text"
        value={editProjectData.title}
        onChange={(e) => setEditProjectData({ ...editProjectData, title: e.target.value })}
      />
      <input
        type="text"
        value={editProjectData.link}
        onChange={(e) => setEditProjectData({ ...editProjectData, link: e.target.value })}
      />
      <input
        type="text"
        value={editProjectData.github}
        onChange={(e) => setEditProjectData({ ...editProjectData, github: e.target.value })}
      />
      <input
        type="text"
        value={editProjectData.description}
        onChange={(e) => setEditProjectData({ ...editProjectData, description: e.target.value })}
      ></input>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setEditProjectData({ ...editProjectData, img: e.target.files[0] })}
      />
      <button onClick={updateProject}>Save</button>
      <button onClick={() => setEditProjectId(null)}>Cancel</button>
    </div>
  )}
</div>




    </div>
  );
};

export default AdminDashboard;
