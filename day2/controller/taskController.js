import { prisma } from "../config/prisma";
import fs from 'fs'
import path from "path";

export const assignTask=async (req,res)=>{
    const { title, internId } = req.body;
    const attachment = req.file?.path;

    const task = await prisma.task.create({
      data: {
        title,
        attachment,
        status: 'pending',
        intern: { connect: { id: parseInt(internId) } } // ✅ only connect
      }
    });
res.json(task)
}

///update

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: { status }
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// delete
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await prisma.task.delete({
      where: { id: parseInt(taskId) }
    });

    res.json({ message: "Task deleted", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const downloadAttachment=async(req,res)=>{
    const filePath=req.params.path;

    const stream =fs.createReadStream(`uploads/${filePath}`)
    stream.pipe(res)


}


///

export const downloadTaskAttachment = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Validate taskId exists
    if (!taskId) {
      return res.status(400).json({ message: "taskId parameter is required" });
    }

    const taskIdInt = parseInt(taskId, 10);

    if (isNaN(taskIdInt)) {
      return res.status(400).json({ message: "taskId must be a number" });
    }

    // Fetch task from database
    const task = await prisma.task.findUnique({
      where: { id: taskIdInt },
    });

    if (!task || !task.attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

   let fileName = path.basename(task.attachment); // <- only the filename, strip folder
const filePath = path.resolve("upload", fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found on server" });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on("error", (err) => {
      console.error("File streaming error:", err);
      res.status(500).json({ message: "Error reading file" });
    });
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ message: "Server error" });
  }
};