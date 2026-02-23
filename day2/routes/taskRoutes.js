import express from "express";
import { updateTaskStatus, deleteTask, assignTask ,downloadTaskAttachment} from "../controller/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// Create Task
router.post("/", authMiddleware, authorize(["admin"]), upload.single("attachment"), assignTask);

// Update status
router.put("/:taskId/status", authMiddleware, authorize(["admin", "intern"]), updateTaskStatus);

// Delete task (admin only)
router.delete("/:taskId", authMiddleware, authorize(["admin"]), deleteTask);

router.get("/:taskId/download", authMiddleware, downloadTaskAttachment);

export default router;