import express from "express";
const router = express.Router();
import { createAttendance, fetchAttendance, getStudentAttendance, updateAttendance, deleteAttendance } from "../controller/attendanceController.js";
import { validate } from "../middleware/validator.js";
import { createAttendanceRules, updateAttendanceRules } from "../middleware/attendanceValidator.js";

router.post("/", createAttendanceRules, validate, createAttendance);
router.get("/records", fetchAttendance);
router.get("/student/:studentId", getStudentAttendance);
router.patch("/update/:studentId", updateAttendanceRules, validate, updateAttendance );
router.delete("/delete/:studentId", deleteAttendance);
export default router;

