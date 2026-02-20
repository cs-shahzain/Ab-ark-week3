import { prisma } from "../config/prisma";

// upload file
const uploadProfileImage = async (req, res) => {
  try {
    if(!req.file){
        return res.status(400).json({message:"No file uploaded..."})
    }

    const user= await prisma.user.update({
     where: { id: req.user.userId },
        data:{profileImage:req.file.path}
    })
    res.status(200).json({ message: "File uploaded", path: req.file.path })




  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { uploadProfileImage };
