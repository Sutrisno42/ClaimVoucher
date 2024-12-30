import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/User.js"
import { verify } from "../middleware/Auth.js";

const router = express.Router();

router.get('/users', verify, getUsers);
router.get('/users/:id', verify, getUserById);
router.post('/users', createUser);
router.patch('/users/:id', verify, updateUser);
router.delete('/users/:id', verify, deleteUser);

export default router;