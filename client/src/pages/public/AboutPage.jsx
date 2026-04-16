import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import api from "../../api/axios";

const AboutPage = () => {
  const [profile, setProfile] = useState(null);
  const defaultSummary =
    "I am actively strengthening my full stack development skills through real-world projects, consistent practice, and hands-on implementation of React, Node.js, Express, and MongoDB.";

  const links = {
    linkedin: "https://linkedin.com/in/sonali-motkar-48002a2b8",
    github: "https://github.com/Sonali-Motkar",
    hackerrank: "https://www.hackerrank.com/profile/sonalimotkar001",
    leetcode: "https://leetcode.com/u/Sonal_motkar/"
  };

  useEffect(() => {
    api.get("/profile").then((res) => setProfile(res.data)).catch(() => { });
  }, []);

  const rawAbout = profile?.about?.trim() || "";
  const aboutText =
    !rawAbout || /^write your summary here\.?$/i.test(rawAbout) ? defaultSummary : rawAbout;
  const resumeUrl = profile?.resumeUrl?.trim() || "/resume.pdf";

  return (
    <PublicLayout>
      <section className="card about-card about-impressive page-animate-in">
        <div className="about-hero">
          <div className="about-head animate-rise delay-1">
            <p className="about-kicker">Aspiring Full Stack Developer</p>
            <h2>About Me</h2>
            <p className="about-intro">
              I am <strong>Sonali Motkar</strong>, a Master of Computer Applications (MCA) student focused on building
              practical, user-friendly web applications. I enjoy transforming ideas into real digital products
              with clean interfaces, efficient backend APIs, and structured databases.
            </p>

            <div className="about-highlight-row">
              <span className="about-pill">MERN Stack</span>
              <span className="about-pill">API Integration</span>
              <span className="about-pill">Problem Solving</span>
              <span className="about-pill">Responsive UI</span>
            </div>
          </div>

          <div className="about-photo-wrap about-photo-card animate-rise delay-2">
            <img
              className="about-photo"
              src="/certificates/sonal.png"
              alt="Sonali Motkar profile"
            />
            <p className="about-photo-name">Sonali Motkar</p>
            <p className="about-photo-role">Master of Computer Applications Student</p>
          </div>
        </div>

        <div className="about-grid stagger-grid">
          <article className="about-panel animate-rise delay-1">
            <h3>Professional Summary</h3>
            <p>{aboutText}</p>
            <p>
              A detail-oriented aspiring software developer with hands-on experience in frontend development,
              RESTful APIs, and backend integration. I enjoy building applications that solve real student and
              business challenges while continuously improving my technical and analytical skills.
            </p>
          </article>

          <article className="about-panel animate-rise delay-2">
            <h3>Core Focus Areas</h3>
            <ul className="about-list">
              <li>MERN Stack Application Development</li>
              <li>Responsive UI Design with React</li>
              <li>REST API Design and Integration</li>
              <li>MongoDB Data Modeling and CRUD Operations</li>
              <li>Version Control and Project Deployment</li>
            </ul>
          </article>

          <article className="about-panel animate-rise delay-3">
            <h3>What I Bring</h3>
            <ul className="about-list">
              <li>Clear understanding of end-to-end project flow</li>
              <li>Ability to build complete frontend and backend modules</li>
              <li>Comfortable with databases, APIs, and admin dashboards</li>
              <li>Strong willingness to learn and adapt quickly</li>
            </ul>
          </article>

          <article className="about-panel animate-rise delay-4">
            <h3>Profiles</h3>
            <div className="quick-links">
              <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={links.hackerrank} target="_blank" rel="noreferrer">HackerRank</a>
              <a href={links.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
              <a href={resumeUrl} target="_blank" rel="noreferrer">Resume</a>
            </div>
            <p className="about-contact-note">
              For collaboration and opportunities, please connect through the Contact page.
            </p>
          </article>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;
