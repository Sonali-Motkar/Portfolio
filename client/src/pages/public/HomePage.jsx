import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const HomePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/profile").then((res) => setProfile(res.data)).catch(() => {});
  }, []);

  return (
    <PublicLayout>
      <section className="home-hero-card">
        <div className="home-glow home-glow-left" />
        <div className="home-glow home-glow-center" />
        <div className="home-glow home-glow-right" />

        <div className="home-hero-grid">
          <div className="home-copy">
            <p className="home-kicker">Hello, I&apos;m</p>
            <h1>{profile?.fullName || "Sonali Motkar"}</h1>
            <p className="home-role">MERN Stack Developer</p>
          </div>

          <div className="home-photo-shell">
            <img
              className="home-photo"
              src="/certificates/sonal.png"
              alt={`${profile?.fullName || "Sonali Motkar"} profile`}
            />
          </div>
        </div>

        <div className="home-cta-row">
          <Link to="/projects" className="btn">View Projects</Link>
          <Link to="/contact" className="btn secondary">Contact</Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
