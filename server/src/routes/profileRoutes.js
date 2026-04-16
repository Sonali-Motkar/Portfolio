import { Router } from "express";
import { getProfile, upsertProfile } from "../controllers/profileController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getProfile);
router.put("/", protect, upsertProfile);

export default router;
