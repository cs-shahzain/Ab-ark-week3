import express from 'express'
import {createUser,getUsers,deleteUser,findUser} from "../controller/userController.js";
const router = express.Router();

router.get('/user',getUsers)
router.post('/user',createUser)
router.delete('/user/:id',deleteUser)
router.get('/user/:id',findUser)



export default router;

