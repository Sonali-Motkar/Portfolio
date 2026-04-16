import dotenv from "dotenv";
import mongoose from "mongoose";
import Skill from "./src/models/Skill.js";

dotenv.config();

const skillData = [
  { name: "Next.js", category: "Frontend", level: "Intermediate" },
  { name: "Supabase", category: "Backend & Database", level: "Intermediate" },
  { name: "Clerk", category: "Authentication", level: "Intermediate" },
  { name: "dnd-kit", category: "Frontend", level: "Intermediate" },
  { name: "Tailwind CSS", category: "Frontend", level: "Advanced" },
  { name: "TypeScript", category: "Programming", level: "Intermediate" }
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  for (const skill of skillData) {
    await Skill.findOneAndUpdate(
      { name: skill.name },
      { $set: skill },
      { upsert: true, returnDocument: "after" }
    );
  }

  const total = await Skill.countDocuments();
  console.log(`Skills upserted. Total skills: ${total}`);
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
