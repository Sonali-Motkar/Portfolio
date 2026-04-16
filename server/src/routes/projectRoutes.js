import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getProjects);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
