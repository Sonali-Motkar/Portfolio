import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "./src/models/Project.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const payload = {
    title: "Trello-Updated",
    description:
      "A production-ready Trello-style task management application with boards, columns, dynamic task management, drag-and-drop, real-time updates, and filtering. Built for smooth collaboration workflows and modern UI/UX.",
    techStack: [
      "Next.js",
      "Supabase",
      "Clerk",
      "dnd-kit",
      "Tailwind CSS",
      "TypeScript"
    ],
    githubUrl: "https://github.com/Sonali-Motkar/Trello-Updated",
    liveUrl: "",
    imageUrl: "",
    featured: true
  };

  const doc = await Project.findOneAndUpdate(
    { title: payload.title },
    { $set: payload },
    { upsert: true, returnDocument: "after" }
  );

  console.log("Project upserted:", doc.title);
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
