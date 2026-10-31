import express from 'express';
const router = express.Router();
import { createOrUpdateSchedule, addTemporarySchedule, getAllSchedules, getScheduleByClass, deleteSchedule } from "../controller/scheduleController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

router.post('/', protect, adminOnly, createOrUpdateSchedule);
router.post('/override', protect, adminOnly, addTemporarySchedule);
router.get('/records', getAllSchedules);
router.get('/records/:className', getScheduleByClass);
router.delete('/records/:className', protect, adminOnly, deleteSchedule);
export default router;
