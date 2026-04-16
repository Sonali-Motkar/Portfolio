import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: "General" },
    level: { type: String, default: "Intermediate" },
    icon: { type: String, default: "" }
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
