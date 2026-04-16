import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    keyFeatures: [{ type: String }],
    outcome: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
