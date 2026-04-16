import { Router } from "express";
import { getMe, loginAdmin } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", protect, getMe);

export default router;
