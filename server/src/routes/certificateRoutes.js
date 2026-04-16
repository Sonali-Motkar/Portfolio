import { Router } from "express";
import {
  createCertificate,
  deleteCertificate,
  getCertificates,
  updateCertificate
} from "../controllers/certificateController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getCertificates);
router.post("/", protect, createCertificate);
router.put("/:id", protect, updateCertificate);
router.delete("/:id", protect, deleteCertificate);

export default router;
