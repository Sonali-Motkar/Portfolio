import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "../models/Project.js";

dotenv.config();

const addCodtechProject = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const doc = {
    title: "Weather App",
    description:
      "A responsive weather application that provides real-time weather insights and 5-day forecasts for cities using API integration. Includes city search, random city explore view, and saved city management.",
    techStack: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    githubUrl: "https://github.com/Sonali-Motkar/codtech-task1",
    liveUrl: "",
    imageUrl: "",
    featured: true
  };

  const project = await Project.findOneAndUpdate(
    { githubUrl: doc.githubUrl },
    doc,
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );

  console.log(`Project upserted: ${project.title}`);
  await mongoose.disconnect();
};

addCodtechProject().catch(async (error) => {
  console.error("Failed to upsert project:", error.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});

