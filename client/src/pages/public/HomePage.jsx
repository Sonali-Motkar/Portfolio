import { useEffect, useMemo, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import api from "../../api/axios";

const fallbackSkills = [
  { _id: "react", name: "React", category: "Frontend" },
  { _id: "node", name: "Node.js", category: "Backend" },
  { _id: "express", name: "Express.js", category: "Backend" },
  { _id: "mongo", name: "MongoDB", category: "Database" },
  { _id: "js", name: "JavaScript", category: "Programming" },
  { _id: "css", name: "CSS3", category: "Frontend" },
  { _id: "html", name: "HTML5", category: "Frontend" },
  { _id: "mysql", name: "MySQL", category: "Database" },
  { _id: "aws", name: "AWS", category: "Cloud" },
  { _id: "rest", name: "REST APIs", category: "Backend" },
  { _id: "postman", name: "Postman", category: "Tools" },
  { _id: "Python", name: "Python", category: "Programming" },
  { _id: "Git", name: "Git", category: "Version Control" }
];

const academicRows = [
  {
    level: "Secondary School (SSC - 10th)",
    boardOrUniversity: "Maharashtra State Board",
    year: "March 2019",
    score: "74.00%",
    
  },
  {
    level: "Higher Secondary (HSC - 12th)",
    boardOrUniversity: "Maharashtra State Board",
    year: "2021",
    score: "76.67%",
    
  },
  {
    level: "Graduation (BBA - Computer Applications)",
    boardOrUniversity: "Savitribai Phule Pune University",
    year: "2024",
    score: "CGPA: 7.69 | Grade: A",
    
  },
  {
    level: "Post Graduation (MCA - Semester I)",
    boardOrUniversity: "Dnyan Prasad Global University",
    year: "2025 - 2027 (Pursuing)",
    score: "75.00% | (sem I)SGPA: 8.18",
    
  }
];

const defaultLinks = {
  linkedin: "https://linkedin.com/in/sonali-motkar-48002a2b8",
  github: "https://github.com/Sonali-Motkar",
  hackerrank: "https://www.hackerrank.com/profile/sonalimotkar001",
  leetcode: "https://leetcode.com/u/Sonal_motkar/",
  resume: "/resume.pdf"
};

const contactApps = [
  {
    key: "email",
    label: "Email",
    icons: ["https://api.iconify.design/logos:google-gmail.svg"]
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icons: [
      "https://api.iconify.design/logos:linkedin-icon.svg",
      "https://cdn.simpleicons.org/linkedin/0A66C2"
    ]
  },
  {
    key: "github",
    label: "GitHub",
    icons: [
      "https://cdn.simpleicons.org/github/ffffff",
      "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg"
    ]
  },
  {
    key: "hackerrank",
    label: "HackerRank",
    icons: [
      "https://cdn.simpleicons.org/hackerrank/00EA64",
      "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/hackerrank.svg"
    ]
  },
  {
    key: "leetcode",
    label: "LeetCode",
    icons: [
      "https://cdn.simpleicons.org/leetcode/F89F1B",
      "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/leetcode.svg"
    ]
  },
  {
    key: "resume",
    label: "Download Resume",
    icons: ["https://api.iconify.design/bi:file-earmark-pdf-fill.svg?color=%23ffffff"],
    download: true
  }
];

const skillCategoryLabels = {
  Frontend: "UI",
  Backend: "API",
  Database: "DB",
  Programming: "Logic",
  Cloud: "Cloud",
  Tools: "Tool",
  "Version Control": "Tool",
  Framework: "Framework",
  Authentication: "Auth"
};

const skillCategoryAccents = {
  Frontend: "#8fd7ff",
  Backend: "#8bffbd",
  Database: "#ffd166",
  Programming: "#f89f1b",
  Cloud: "#7b61ff",
  Tools: "#f5f5f5",
  "Version Control": "#f5f5f5",
  Framework: "#ff6b9a",
  Authentication: "#b8ff4d"
};

const formatCertificateDate = (value) => {
  if (!value) return "Certificate";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Certificate";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

const getOriginalCertificateDate = (cert) => {
  const title = `${cert?.title || ""}`.toLowerCase();
  if (title.includes("seven mentor")) return "Mar 8, 2025";
  if (title.includes("javascript")) return "Dec 30, 2025";
  if (title.includes("python")) return "Dec 30, 2025";
  if (title.includes("frontend")) return "Mar 16, 2026";
  if (title.includes("node")) return "Mar 15, 2026";
  return formatCertificateDate(cert?.issueDate);
};

const HomePage = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState(fallbackSkills);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api.get("/profile").then((res) => setProfile(res.data)).catch(() => {});
    api.get("/skills").then((res) => {
      if (Array.isArray(res.data) && res.data.length) setSkills(res.data);
    }).catch(() => {});
    api.get("/projects").then((res) => {
      if (Array.isArray(res.data)) setProjects(res.data);
    }).catch(() => {});
    api.get("/certificates").then((res) => {
      if (Array.isArray(res.data)) setCertificates(res.data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const featuredProjects = useMemo(() => {
    const list = projects.length ? projects : [
      {
        _id: "portfolio",
        title: "Portfolio CMS",
        description: "Admin-managed portfolio with secure auth, REST APIs, message pipeline, and responsive UI.",
        techStack: ["React", "Node.js", "MongoDB"],
        featured: true
      },
      {
        _id: "weather",
        title: "Weather App",
        description: "City search, forecast cards, and saved weather views using a public weather API.",
        techStack: ["JavaScript", "API", "CSS"]
      }
    ];
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 5);
  }, [projects]);

  const skillRows = useMemo(() => {
    const priority = [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "CSS3",
      "HTML5",
      "MySQL",
      "AWS",
      "REST APIs",
      "Postman",
      "Python",
      "Git",
      "C++"
    ];
    return [...skills]
      .sort((a, b) => {
        const aIndex = priority.indexOf(a.name);
        const bIndex = priority.indexOf(b.name);
        if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      })
      .slice(0, 14);
  }, [skills]);

  const orderedCertificates = useMemo(() => {
    return [...certificates].sort((a, b) => {
      const aIsSevenMentor = /seven mentor/i.test(`${a.title || ""} ${a.issuer || ""}`);
      const bIsSevenMentor = /seven mentor/i.test(`${b.title || ""} ${b.issuer || ""}`);
      if (aIsSevenMentor && !bIsSevenMentor) return -1;
      if (!aIsSevenMentor && bIsSevenMentor) return 1;
      return new Date(b.issueDate || 0).getTime() - new Date(a.issueDate || 0).getTime();
    });
  }, [certificates]);

  const submitMessage = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus("");
    try {
      await api.post("/messages", form);
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("Message sent. I will reply soon.");
    } catch {
      setStatus("Message could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const fullName = profile?.fullName || "Sonali Motkar";
  const headline = profile?.headline || "MCA Student | Aspiring Full Stack Developer";
  const heroPhrases = [
    "I build responsive web applications.",
    "I write clean, maintainable MERN code.",
    "I create polished and user-friendly experiences."
  ];
  const [typedLine, setTypedLine] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = heroPhrases[typingIndex];
    const isComplete = typedLine === currentPhrase;
    const timeoutDelay = isDeleting ? 50 : isComplete ? 1300 : 90;

    const timeoutId = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (!isDeleting) {
        setTypedLine(currentPhrase.slice(0, typedLine.length + 1));
        return;
      }

      if (typedLine) {
        setTypedLine(currentPhrase.slice(0, typedLine.length - 1));
        return;
      }

      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % heroPhrases.length);
    }, timeoutDelay);

    return () => window.clearTimeout(timeoutId);
  }, [typedLine, isDeleting, typingIndex]);

  const links = {
    ...defaultLinks,
    ...(profile?.socialLinks || {}),
    resume: profile?.resumeUrl?.trim() || defaultLinks.resume,
    email: "mailto:sonalimotkar4@gmail.com"
  };
  const about =
    profile?.about ||
    "I am actively strengthening my full stack development skills through real-world projects, consistent practice, and hands-on implementation of React, Node.js, Express, and MongoDB.";

  const handleIconError = (event) => {
    const img = event.currentTarget;
    const sources = (img.dataset.sources || "").split("|").filter(Boolean);
    const nextIndex = Number(img.dataset.fallbackIndex || "0") + 1;

    if (nextIndex < sources.length) {
      img.dataset.fallbackIndex = String(nextIndex);
      img.src = sources[nextIndex];
      return;
    }

    img.style.display = "none";
  };

  return (
    <PublicLayout>
      <div className="single-portfolio">
        <section id="home" className="cinema-section hero-scroll-section">
          <div className="hero-copy-block">
            <p className="section-kicker">MERN Stack Developer</p>
            <h1>{fullName}</h1>
            <p className="hero-typing-copy">
              {typedLine || headline}
              <span className="hero-cursor" aria-hidden="true" />
            </p>
            <p className="hero-subtitle">
              Turning ideas into polished digital products with a clean interface and reliable backend.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn">View Projects</a>
              <a href={links.resume} className="btn secondary" target="_blank" rel="noreferrer">
                Download Resume
              </a>
            </div>
          </div>
          <div className="hero-portrait-stage" aria-hidden="true">
            <img src="/certificates/sonal.png" alt={`Portrait of ${fullName}`} />
          </div>
          <div className="hero-statement">
            <span>Building practical web apps</span>
            <strong>with clean code.</strong>
          </div>
        </section>

        <section id="about" className="cinema-section split-section home-about-section">
          <div className="section-copy">
            <p className="section-kicker">About Me</p>
            <h2>About Me</h2>
            <p>
              I am <strong>Sonali Motkar</strong>, a Master of Computer Applications (MCA)
              student focused on building practical, user-friendly web applications. I enjoy
              transforming ideas into real digital products with clean interfaces,
              efficient backend APIs, and structured databases.
            </p>
            <div className="about-highlight-row">
              <span className="about-pill">MERN Stack</span>
              <span className="about-pill">API Integration</span>
              <span className="about-pill">Problem Solving</span>
              <span className="about-pill">Responsive UI</span>
            </div>
            <div className="home-about-summary">
              <h3>Professional Summary</h3>
              <p>
                I am actively strengthening my full stack development skills through
                real-world projects, consistent practice, and hands-on implementation
                of React, Node.js, Express, and MongoDB.
              </p>
                            <p>
                A detail-oriented aspiring software developer with hands-on experience
                in frontend development, RESTful APIs, and backend integration.
              </p>
            </div>
            <div className="home-about-panels">
              <article className="about-panel">
                <h3>Core Focus Areas</h3>
                <ul className="about-list">
                  <li>MERN Stack Application Development</li>
                  <li>Responsive UI Design with React</li>
                  <li>REST API Design and Integration</li>
                  <li>MongoDB Data Modeling and CRUD Operations</li>
                </ul>
              </article>
              <article className="about-panel">
                <h3>What I Bring</h3>
                <ul className="about-list">
                  <li>Clear understanding of end-to-end project flow</li>
                  <li>Ability to build complete frontend and backend modules</li>
                  <li>Comfortable with databases, APIs, and admin dashboards</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="skills" className="cinema-section skills-scroll-section skills-full-section">
          <div className="section-copy">
            <p className="section-kicker">Skills & Expertise</p>
            <h2>Skills I use in my projects.</h2>
            <p className="skills-copy-text">
              My toolkit is centered on MERN stack development, with cloud integration through AWS
              and foundational logic from C++. I build responsive React interfaces, Express APIs,
              MongoDB data models, and clean deployment-ready project structures.
            </p>
            <div className="skills-highlight-row" aria-label="Skill highlights">
              <span>MERN Stack</span>
              <span>Cloud Integration</span>
              <span>API Design</span>
              <span>Problem Solving</span>
            </div>
            <div className="skill-cloud">
              {skillRows.map((skill, index) => (
                <article
                  className="skill-tile"
                  key={skill._id || skill.name}
                  style={{
                    "--reveal-index": index,
                    "--skill-accent": skillCategoryAccents[skill.category] || "#8fd7ff"
                  }}
                >
                  <span className="skill-tile-mark">{skill.name.slice(0, 1)}</span>
                  <div>
                    <h3>{skill.name}</h3>
                    <p>{skillCategoryLabels[skill.category] || skill.category || "Skill"}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="cinema-section projects-scroll-section">
          <div className="section-copy project-head">
            <p className="section-kicker">Featured Work</p>
            <h2>Projects</h2>
            <p>Scroll through selected builds and the stack behind them.</p>
          </div>
          <div className="project-showcase">
            {featuredProjects.map((project, index) => (
              <article
                className="showcase-card"
                key={project._id || project.title}
                style={{ "--reveal-index": index }}
              >
                <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="showcase-visual">
                  <span>{project.title?.slice(0, 1) || "P"}</span>
                </div>
                <div className="showcase-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="mini-tags">
                    {(project.techStack || []).slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="cinema-section journey-scroll-section">
          <div className="section-copy">
            <p className="section-kicker">Education</p>
            <h2>Education</h2>
          </div>
          <div className="education-grid">
            {academicRows.map((row, index) => (
              <article
                key={row.level}
                className="journey-card"
                style={{ "--reveal-index": index }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{row.level}</h3>
                <dl className="education-details">
                  <div>
                    <dt>Board / University</dt>
                    <dd>{row.boardOrUniversity}</dd>
                  </div>
                  <div>
                    <dt>Year</dt>
                    <dd>{row.year}</dd>
                  </div>
                  <div>
                    <dt>Score</dt>
                    <dd>{row.score}</dd>
                  </div>
                  
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="cinema-section certification-scroll-section">
          <div className="section-copy project-head">
            <p className="section-kicker">Certifications</p>
            <h2>Certifications</h2>
            <p>Training certificates and achievements from my development journey.</p>
          </div>

          <div className="cert-showcase-grid">
            {orderedCertificates.map((cert, index) => (
              <article
                key={cert._id}
                className="cert-showcase-card"
                style={{ "--reveal-index": index }}
              >
                {cert.imageUrl ? (
                  <a href={encodeURI(cert.imageUrl)} target="_blank" rel="noreferrer" className="cert-showcase-image">
                    <img src={encodeURI(cert.imageUrl)} alt={`${cert.title} certificate`} />
                  </a>
                ) : (
                  <div className="cert-showcase-image cert-showcase-empty">Certificate</div>
                )}
                <div>
                  <span>{getOriginalCertificateDate(cert)}</span>
                  <h3>{cert.title}</h3>
                  <p>{cert.issuer}</p>
                </div>
              </article>
            ))}
            {!orderedCertificates.length ? (
              <article className="cert-showcase-card cert-showcase-placeholder">
                <div className="cert-showcase-image cert-showcase-empty">No certificates loaded</div>
                <div>
                  <span>Portfolio CMS</span>
                  <h3>Start the backend to load certificates</h3>
                  <p>Certificate data comes from MongoDB through your API.</p>
                </div>
              </article>
            ) : null}
          </div>
        </section>

        <section id="contact" className="cinema-section contact-scroll-section">
          <div className="contact-panel-dark">
            <div>
              <p className="section-kicker">Contact</p>
              <h2>Let us build something useful.</h2>
              <p>Based in Pune, Maharashtra. Open to internships, collaborations, freelance projects, and technical discussions.</p>
              <div className="contact-direct">
                {contactApps.map((app) => (
                  <a
                    key={app.key}
                    href={links[app.key]}
                    target={app.download ? undefined : "_blank"}
                    rel={app.download ? undefined : "noreferrer"}
                    download={app.download || undefined}
                    aria-label={app.label}
                    title={app.label}
                    className="social-logo-link"
                  >
                    <img
                      src={app.icons[0]}
                      alt=""
                      loading="lazy"
                      data-sources={app.icons.join("|")}
                      data-fallback-index="0"
                      onError={handleIconError}
                    />
                    <span>{app.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={submitMessage} className="dark-contact-form">
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Your name"
                required
              />
              <input
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="Your email"
                type="email"
                required
              />
              <input
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                placeholder="Subject"
              />
              <textarea
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                placeholder="Tell me about your project..."
                required
              />
              <button type="submit" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
              {status ? <p className="form-note">{status}</p> : null}
            </form>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default HomePage;
