
import express from 'express'
import { upload } from '../config/multer'
import { uploadProfileImage } from '../controller/uploadController'
import authMiddleware from '../middleware/authMiddleware.js';


const router= express.Router()

router.patch('/profile',
    authMiddleware,
   (req, res, next) => {
    upload.single("profile")(req, res, (err) => {
      if (err) {
        // Multer error (file type or size)
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  uploadProfileImage)

  export default router;