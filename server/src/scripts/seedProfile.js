import dotenv from "dotenv";
import mongoose from "mongoose";
import configureDns from "../config/dns.js";
import Profile from "../models/Profile.js";

dotenv.config();
configureDns();

const seedProfile = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const doc = {
    fullName: "Sonali Motkar",
    headline: "Master of Computer Applications Student | Aspiring Full Stack Developer",
    about:
      "I am actively strengthening my full stack development skills through real-world projects, consistent practice, and hands-on implementation of React, Node.js, Express, and MongoDB.",
    resumeUrl: "/resume.pdf",
    socialLinks: {
      github: "https://github.com/Sonali-Motkar",
      linkedin: "https://linkedin.com/in/sonali-motkar-48002a2b8",
      hackerrank: "https://www.hackerrank.com/profile/sonalimotkar001",
      leetcode: "https://leetcode.com/u/Sonal_motkar/",
      website: "https://leetcode.com/u/Sonal_motkar/"
    }
  };

  const existing = await Profile.findOne();
  const profile = existing
    ? await Profile.findByIdAndUpdate(existing._id, doc, {
        new: true,
        runValidators: true
      })
    : await Profile.create(doc);

  console.log(`Profile upserted: ${profile.fullName}`);
  await mongoose.disconnect();
};

seedProfile().catch(async (error) => {
  console.error("Failed to seed profile:", error.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
