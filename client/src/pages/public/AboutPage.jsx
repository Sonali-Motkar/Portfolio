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
  const resumeUrl = profile?.resumeUrl?.trim() || "/resume.pdf";
  const profileApps = [
    {
      label: "LinkedIn",
      url: links.linkedin,
      icons: [
        "https://cdn.simpleicons.org/linkedin/0A66C2",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg"
      ]
    },
    {
      label: "GitHub",
      url: links.github,
      icons: [
        "https://cdn.simpleicons.org/github/111111",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg"
      ]
    },
    {
      label: "HackerRank",
      url: links.hackerrank,
      icons: [
        "https://cdn.simpleicons.org/hackerrank/00EA64",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/hackerrank.svg"
      ]
    },
    {
      label: "LeetCode",
      url: links.leetcode,
      icons: [
        "https://cdn.simpleicons.org/leetcode/F89F1B",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/leetcode.svg"
      ]
    },
    {
      label: "Resume",
      url: resumeUrl,
      icons: ["https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/file-earmark-pdf.svg"]
    }
  ];

  const handleIconError = (e, label) => {
    const img = e.currentTarget;
    const sources = (img.dataset.sources || "").split("|").filter(Boolean);
    const nextIndex = Number(img.dataset.fallbackIndex || "0") + 1;

    if (nextIndex < sources.length) {
      img.dataset.fallbackIndex = String(nextIndex);
      img.src = sources[nextIndex];
      return;
    }

    img.style.display = "none";
    const holder = img.parentElement;
    if (!holder || holder.querySelector(".profile-icon-fallback")) return;
    const fallback = document.createElement("span");
    fallback.className = "profile-icon-fallback";
    fallback.textContent = label.slice(0, 2).toUpperCase();
    holder.appendChild(fallback);
  };

  useEffect(() => {
    api.get("/profile").then((res) => setProfile(res.data)).catch(() => { });
  }, []);

  const rawAbout = profile?.about?.trim() || "";
  const aboutText =
    !rawAbout || /^write your summary here\.?$/i.test(rawAbout) ? defaultSummary : rawAbout;

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
            <div className="profile-icon-links">
              {profileApps.map((app) => (
                <a
                  key={app.label}
                  href={app.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={app.label}
                  title={app.label}
                >
                  <img
                    src={app.icons[0]}
                    alt={app.label}
                    loading="lazy"
                    data-sources={app.icons.join("|")}
                    data-fallback-index="0"
                    onError={(e) => handleIconError(e, app.label)}
                  />
                </a>
              ))}
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
