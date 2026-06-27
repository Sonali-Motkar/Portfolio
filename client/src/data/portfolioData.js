export const fallbackCertificates = [
  {
    _id: "cert-tata-forage",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata and Forage",
    issueDate: "2026-05-06",
    description:
      "Completed practical job simulation tasks covering exploratory data analysis, risk profiling, AI-based delinquency prediction, and data storytelling.",
    credentialUrl: "",
    imageUrl: "/certificates/TATA FORGE_page-0001.jpg"
  },
  {
    _id: "cert-infosys-ai",
    title: "Introduction to Artificial Intelligence",
    issuer: "Infosys Springboard",
    issueDate: "2026-05-06",
    description:
      "Successfully completed the Infosys Springboard course introducing artificial intelligence concepts and foundations.",
    credentialUrl: "https://verify.onwingspan.com",
    imageUrl: "/certificates/infosys spring Ai intro certification_page-0001.jpg"
  },
  {
    _id: "cert-react",
    title: "Frontend Developer (React) Certificate",
    issuer: "Professional Training Program",
    issueDate: "2026-03-16",
    description:
      "Demonstrates React fundamentals including components, hooks, routing, state handling, API integration, and reusable UI design.",
    credentialUrl: "",
    imageUrl: "/certificates/frontend-developer-react-certificate.jpg"
  },
  {
    _id: "cert-node",
    title: "Node.js Intermediate Certificate",
    issuer: "Professional Training Program",
    issueDate: "2026-03-15",
    description:
      "Validates backend development skills with Node.js, Express, middleware, REST APIs, and server-side architecture basics.",
    credentialUrl: "",
    imageUrl: "/certificates/nodejs-intermediate-certificate.jpg"
  },
  {
    _id: "cert-seven-mentor",
    title: "Certificate Seven Mentor",
    issuer: "Seven Mentor",
    issueDate: "2025-03-08",
    description:
      "Completed industry-oriented training with practical assignments covering core software development skills and project execution.",
    credentialUrl: "",
    imageUrl: "/certificates/certificate-seven-mentor.jpg"
  },
  {
    _id: "cert-javascript",
    title: "JavaScript Certificate",
    issuer: "Professional Training Program",
    issueDate: "2025-12-30",
    description:
      "Covers modern JavaScript concepts such as ES6+, DOM manipulation, asynchronous programming, and clean coding practices.",
    credentialUrl: "",
    imageUrl: "/certificates/javascript-certificate.jpg"
  },
  {
    _id: "cert-python",
    title: "Python Certificate",
    issuer: "Professional Training Program",
    issueDate: "2025-12-30",
    description:
      "Demonstrates Python programming proficiency including syntax, functions, modules, problem solving, and scripting workflows.",
    credentialUrl: "",
    imageUrl: "/certificates/python-certificate.jpg"
  }
];

export const fallbackProjects = [
  {
    _id: "portfolio-cms",
    title: "Portfolio CMS",
    description:
      "Admin-managed portfolio with secure auth, REST APIs, message pipeline, and responsive UI.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB"],
    keyFeatures: [
      "Admin dashboard for portfolio content",
      "JWT authentication and protected routes",
      "REST APIs for projects, skills, certificates, and messages"
    ],
    outcome:
      "Created a complete portfolio management system with public pages and admin-controlled content.",
    githubUrl: "https://github.com/Sonali-Motkar/sonal-Portfolio",
    liveUrl: "",
    imageUrl: "",
    featured: true
  },
  {
    _id: "weather-app",
    title: "Weather App",
    description:
      "A responsive weather application that provides real-time weather insights and 5-day forecasts for cities using API integration.",
    techStack: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    keyFeatures: [
      "City search with current weather details",
      "5-day forecast cards",
      "Saved city management"
    ],
    outcome:
      "Built a clean API-powered weather experience with practical frontend state handling.",
    githubUrl: "https://github.com/Sonali-Motkar/codtech-task1",
    liveUrl: "",
    imageUrl: "",
    featured: true
  },
  {
    _id: "trello-updated",
    title: "Trello-Updated",
    description:
      "A production-ready Trello-style task management application with boards, columns, dynamic task management, drag-and-drop, real-time updates, and filtering.",
    techStack: ["Next.js", "Supabase", "Clerk", "dnd-kit", "Tailwind CSS", "TypeScript"],
    keyFeatures: [
      "Board and column based task organization",
      "Drag-and-drop task movement",
      "Authentication and real-time data flow"
    ],
    outcome:
      "Delivered a modern task management workflow with collaborative UI patterns.",
    githubUrl: "https://github.com/Sonali-Motkar/Trello-Updated",
    liveUrl: "",
    imageUrl: "",
    featured: true
  },
  {
    _id: "goal-corporation",
    title: "Goal Corporation - Loan Services Platform",
    description:
      "A full-stack web application for loan services, including personal, business, and home loans with eligibility checks and EMI calculations.",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "EmailJS"],
    keyFeatures: [
      "Responsive loan service frontend",
      "EMI calculators and eligibility checks",
      "REST APIs and EmailJS notifications"
    ],
    outcome:
      "Delivered a scalable loan service platform demonstrating full-stack development, API integration, and database management.",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: true
  }
];

export const mergeByTitle = (apiItems, fallbackItems) => {
  const merged = Array.isArray(apiItems) ? [...apiItems] : [];
  const existingTitles = new Set(
    merged.map((item) => `${item?.title || ""}`.trim().toLowerCase()).filter(Boolean)
  );

  for (const item of fallbackItems) {
    const title = `${item.title || ""}`.trim().toLowerCase();
    if (!existingTitles.has(title)) {
      merged.push(item);
    }
  }

  return merged;
};
