import Certificate from "../models/Certificate.js";

export const getCertificates = async (req, res) => {
  const certificates = await Certificate.find().sort({ issueDate: -1 });
  res.json(certificates);
};

export const createCertificate = async (req, res) => {
  const certificate = await Certificate.create(req.body);
  res.status(201).json(certificate);
};

export const updateCertificate = async (req, res) => {
  const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!certificate) {
    return res.status(404).json({ message: "Certificate not found" });
  }

  res.json(certificate);
};

export const deleteCertificate = async (req, res) => {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);
  if (!certificate) {
    return res.status(404).json({ message: "Certificate not found" });
  }

  res.json({ message: "Certificate deleted" });
};
