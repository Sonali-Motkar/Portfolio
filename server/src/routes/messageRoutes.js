import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
  toggleMessageRead
} from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", createMessage);
router.get("/", protect, getMessages);
router.patch("/:id/read", protect, toggleMessageRead);
router.delete("/:id", protect, deleteMessage);

export default router;
