import express from 'express';
const router = express.Router();
import { createOrUpdateSchedule, addTemporarySchedule } from "../controller/scheduleController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

router.post('/', protect, adminOnly, createOrUpdateSchedule);
router.post('/override', protect, adminOnly, addTemporarySchedule);
export default router;
