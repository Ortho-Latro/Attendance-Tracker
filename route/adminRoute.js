import express from 'express';
const router = express.Router();
import { createStudent, getAllStudents, getStudentById } from '../controller/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

router.post('/students', protect, adminOnly, createStudent);
router.get('/students', protect, adminOnly, getAllStudents);
router.get('/students/:id', protect, adminOnly, getStudentById);
export default router;
