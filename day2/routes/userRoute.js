import express from 'express'
import {getUsers,deleteUser} from "../controller/userController.js";
import authorize  from '../middleware/roleMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/',authMiddleware,getUsers)
router.delete(
  "/:id",
  authMiddleware,          // First check token
  authorize("ADMIN"),  // Then check role
  deleteUser
);



export default router;

