import dotenv from "dotenv";
import mongoose from "mongoose";
import configureDns from "../config/dns.js";
import Project from "../models/Project.js";

dotenv.config();
configureDns();

const projects = [
  {
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
    title: "Weather App",
    description:
      "A responsive weather application that provides real-time weather insights and 5-day forecasts for cities using API integration. Includes city search, random city explore view, and saved city management.",
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
    title: "Trello-Updated",
    description:
      "A production-ready Trello-style task management application with boards, columns, dynamic task management, drag-and-drop, real-time updates, and filtering. Built for smooth collaboration workflows and modern UI/UX.",
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
    title: "Goal Corporation - Loan Services Platform",
    description:
      "A full-stack web application designed to provide users with multiple loan services, including personal, business, and home loans with eligibility checks and EMI calculations.",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "EmailJS"],
    keyFeatures: [
      "Developed a responsive frontend using React.js and Tailwind CSS for seamless user experience",
      "Built dynamic modules for loan applications, EMI calculators, and eligibility checks",
      "Designed and implemented RESTful APIs using Express.js for efficient data handling",
      "Managed structured data storage using MySQL database",
      "Integrated EmailJS for automated notifications and user communication",
      "Ensured smooth interaction between frontend and backend systems"
    ],
    outcome:
      "Delivered a scalable loan service platform demonstrating strong skills in full-stack development, API integration, and database management.",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: true
  }
];

const seedProjects = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  for (const project of projects) {
    await Project.findOneAndUpdate({ title: project.title }, project, {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true
    });
  }

  const total = await Project.countDocuments();
  console.log(`Projects upserted successfully. Total projects: ${total}`);
  await mongoose.disconnect();
};

seedProjects().catch(async (error) => {
  console.error("Failed to seed projects:", error.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
