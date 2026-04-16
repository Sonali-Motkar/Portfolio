import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "../models/Project.js";

dotenv.config();

const addGoalCorporationProject = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const doc = {
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
  };

  const project = await Project.findOneAndUpdate({ title: doc.title }, doc, {
    upsert: true,
    returnDocument: "after",
    setDefaultsOnInsert: true
  });

  console.log(`Project upserted: ${project.title}`);
  await mongoose.disconnect();
};

addGoalCorporationProject().catch(async (error) => {
  console.error("Failed to upsert project:", error.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});

