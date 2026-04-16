import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const HomePage = () => {
  const [profile, setProfile] = useState(null);
  const links = {
    linkedin: "https://linkedin.com/in/sonali-motkar-48002a2b8",
    github: "https://github.com/Sonali-Motkar",
    email: "sonalimotkar4@gmail.com"
  };

  useEffect(() => {
    api.get("/profile").then((res) => setProfile(res.data)).catch(() => {});
  }, []);

  return (
    <PublicLayout>
      <section className="card">
        <h1>{profile?.fullName || "Your Name"}</h1>
        <p>{profile?.headline || "Full Stack Developer"}</p>
        <p>{profile?.about || "Build your dynamic profile from admin panel."}</p>
        <div className="quick-links">
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${links.email}`}>{links.email}</a>
        </div>
        <div className="row">
          <Link to="/projects" className="btn">View Projects</Link>
          <Link to="/contact" className="btn secondary">Contact Me</Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
