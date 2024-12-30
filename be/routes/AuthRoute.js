import express from "express";
import {Login, getProfil, Logout} from "../controllers/Auth.js"

const router = express.Router();

router.get('/getprofil', getProfil);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;