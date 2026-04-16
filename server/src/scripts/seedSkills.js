import dotenv from "dotenv";
import mongoose from "mongoose";
import Skill from "../models/Skill.js";

dotenv.config();

const seedSkills = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const docs = [
    { name: "JavaScript", category: "Programming", level: "Advanced" },
    { name: "TypeScript", category: "Programming", level: "Intermediate" },
    { name: "Java", category: "Programming", level: "Intermediate" },
    { name: "C++", category: "Programming", level: "Intermediate" },
    { name: "Python", category: "Programming", level: "Intermediate" },

    { name: "HTML5", category: "Frontend", level: "Advanced" },
    { name: "CSS3", category: "Frontend", level: "Advanced" },
    { name: "React", category: "Frontend", level: "Intermediate" },
    { name: "Tailwind CSS", category: "Frontend", level: "Advanced" },
    { name: "Next.js", category: "Frontend", level: "Intermediate" },
    { name: "dnd-kit", category: "Frontend", level: "Intermediate" },
    { name: "Vite", category: "Frontend", level: "Intermediate" },

    { name: "Node.js", category: "Backend", level: "Intermediate" },
    { name: "Express.js", category: "Backend", level: "Intermediate" },
    { name: "REST APIs", category: "Backend", level: "Intermediate" },
    { name: "Spring", category: "Framework", level: "Beginner" },

    { name: "MongoDB", category: "Database", level: "Intermediate" },
    { name: "MySQL", category: "Database", level: "Intermediate" },
    { name: "Supabase", category: "Database", level: "Intermediate" },

    { name: "AWS", category: "Cloud", level: "Beginner" },
    { name: "Vercel", category: "Cloud", level: "Intermediate" },
    { name: "Render", category: "Cloud", level: "Intermediate" },

    { name: "Git", category: "Tools", level: "Intermediate" },
    { name: "GitHub", category: "Tools", level: "Intermediate" },
    { name: "Postman", category: "Tools", level: "Intermediate" },

    { name: "Clerk", category: "Authentication", level: "Intermediate" },
    { name: "JWT", category: "Authentication", level: "Intermediate" }
  ];

  for (const doc of docs) {
    await Skill.findOneAndUpdate({ name: doc.name }, doc, {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true
    });
  }

  const total = await Skill.countDocuments();
  console.log(`Skills upserted successfully. Total skills: ${total}`);
  await mongoose.disconnect();
};

seedSkills().catch(async (error) => {
  console.error("Failed to seed skills:", error.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});

