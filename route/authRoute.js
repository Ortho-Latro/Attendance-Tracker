import express from 'express';
const router = express.Router();
import {loginUser} from '../controller/authController.js';

router.post('/login', loginUser);
export default router;