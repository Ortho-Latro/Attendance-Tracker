import express from "express";
const router = express.Router();
import { createAttendance, fetchAttendance, updateAttendance, deleteAttendance } from "../controller/attendance.js";
import { validate } from "../middleware/validate.js";
import { createAttendanceRules, updateAttendanceRules } from "../middleware/attendanceValidator.js";

router.post("/", createAttendanceRules, validate, createAttendance);
router.get("/records", fetchAttendance);
router.patch("/update/:id", updateAttendanceRules, validate, updateAttendance );
router.delete("/delete/:id", deleteAttendance);
export default router;

