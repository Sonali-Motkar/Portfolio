import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: Date, required: true },
    description: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
