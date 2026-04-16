import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, default: "Your Name" },
    headline: { type: String, default: "Full Stack Developer" },
    about: { type: String, default: "Write your summary here." },
    resumeUrl: { type: String, default: "" },
    location: { type: String, default: "" },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
