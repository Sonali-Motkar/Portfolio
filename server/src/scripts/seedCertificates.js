import dotenv from "dotenv";
import mongoose from "mongoose";
import Certificate from "../models/Certificate.js";

dotenv.config();

const seedCertificates = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const docs = [
    {
      title: "Certificate Seven Mentor",
      issuer: "Seven Mentor",
      issueDate: new Date("2025-06-15"),
      description:
        "Completed industry-oriented training with practical assignments covering core software development skills and project execution.",
      credentialUrl: "C:/Users/sonali/OneDrive/Desktop/Certifications/certificate seven mentor.pdf",
      imageUrl: "/certificates/certificate-seven-mentor.jpg"
    },
    {
      title: "Frontend Developer (React) Certificate",
      issuer: "Professional Training Program",
      issueDate: new Date("2025-08-10"),
      description:
        "Demonstrates React fundamentals including components, hooks, routing, state handling, API integration, and reusable UI design.",
      credentialUrl: "C:/Users/sonali/OneDrive/Desktop/Certifications/frontend_developer_react certificate.pdf",
      imageUrl: "/certificates/frontend-developer-react-certificate.jpg"
    },
    {
      title: "JavaScript Certificate",
      issuer: "Professional Training Program",
      issueDate: new Date("2025-05-20"),
      description:
        "Covers modern JavaScript concepts such as ES6+, DOM manipulation, asynchronous programming, and clean coding practices.",
      credentialUrl: "C:/Users/sonali/OneDrive/Desktop/Certifications/javascript .pdf",
      imageUrl: "/certificates/javascript-certificate.jpg"
    },
    {
      title: "Node.js Intermediate Certificate",
      issuer: "Professional Training Program",
      issueDate: new Date("2025-09-05"),
      description:
        "Validates backend development skills with Node.js, Express, middleware, REST APIs, and server-side architecture basics.",
      credentialUrl: "C:/Users/sonali/OneDrive/Desktop/Certifications/nodejs_intermediate certificate.pdf",
      imageUrl: "/certificates/nodejs-intermediate-certificate.jpg"
    },
    {
      title: "Python Certificate",
      issuer: "Professional Training Program",
      issueDate: new Date("2025-04-18"),
      description:
        "Demonstrates Python programming proficiency including syntax, functions, modules, problem solving, and scripting workflows.",
      credentialUrl: "C:/Users/sonali/OneDrive/Desktop/Certifications/python.pdf",
      imageUrl: "/certificates/python-certificate.jpg"
    }
  ];

  for (const doc of docs) {
    await Certificate.findOneAndUpdate({ title: doc.title }, doc, {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true
    });
  }

  const total = await Certificate.countDocuments();
  console.log(`Certificates upserted successfully. Total certificates: ${total}`);
  await mongoose.disconnect();
};

seedCertificates().catch(async (error) => {
  console.error("Failed to seed certificates:", error.message);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
