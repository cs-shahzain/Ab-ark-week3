import express from 'express'
import createIntern from '../controller/internContoller.js'
import authMiddleware from '../middleware/authMiddleware.js'
import authorize from '../middleware/roleMiddleware.js'
import { upload } from '../config/multer.js'

const router = express.Router()

router.post(
  "/",
  authMiddleware,
  authorize(['admin']),
  upload.single("image"),
  createIntern
);

export default router;