import Attendance from '../models/attendance.js';
import Schedule from '../models/Schedule.js';
import { evaluateAttendanceWindow, timeToMinutes, getCurrentTimeInMinutes } from '../utils/timeHelper.js';

// CheckIn students
const checkInStudent = async (req, res) => {
    try {
        const { className, studentId } = req.body;
        if (!studentId || !className) {
            return res.status(400).json({ 
                success: false,
                message:"Please provide both a class name and a student ID."
            });
        }

        const schedule = await Schedule.findOne({ className: className.trim()});
        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: `No schedule found for class: '${className}'.`
            });
        }

        const activeWindow = evaluateAttendanceWindow(schedule);
        if(!activeWindow) {
            return res.status(400).json({
                success: false,
                message: "Attendance is closed. No class is scheduled for today."
            });
        }

        const currentTime = getCurrentTimeInMinutes();
        const startMinutes = timeToMinutes(activeWindow.startTime);
        const lateMinutes = timeToMinutes(activeWindow.lateThreshold);
        const endMinutes = timeToMinutes(activeWindow.endTime);

        let attendanceStatus = "";

        if (currentTime < startMinutes) {
            return res.status(400).json({
                success: false,
                message: "Check-in failed: Class has not started yet."
            });
        } else if (currentTime >= startMinutes && currentTime <= lateMinutes) {
            attendanceStatus = "present";
        } else if (currentTime >= startMinutes && currentTime >= lateMinutes) {
            attendanceStatus = "late";
        } else {
            return res.status(400).json({
                success:false,
                message:"Check-in failed: Attendance winow is closed for today."
            });
        }

        const todayDate = new Date().toISOString().split('T')[0];

        const existingAttendance = await Attendance.findOne({
            studentId,
            className: className.trim(),
            date: todayDate
        });

        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: "Check-in failed: Student has already checked in for this class today."
            });
        }

        const newAttendance = new Attendance({
            studentId,
            className: className.trim(),
            date: todayDate,
            status: attendanceStatus,
            checkInTime: new Date()
        });

        await newAttendance.save();

        return res.status(200).json({
            success: true,
            message: `Check-in recorded successfully as ${attendanceStatus}.`,
            data: newAttendance
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to process check-in."
        });
    }
};

// Fetch all attendance records
const fetchAttendance = async (req, res, next) => {
    try {
        
        const attendanceRecords = await Attendance.find().sort({date: -1});

        if (attendanceRecords.length === 0) {
            return res.status(404).json({ message: "No attendance records found" });
        }

        return res.status(200).json({
            success: true,
            count: attendanceRecords.length,
            data: attendanceRecords
        });

    } catch (error) {
        next(error);
    }
};

//Fetch a single student attendance record
const getStudentAttendance = async (req, res, next) =>{
    try {
        const studentId = decodeURIComponent(req.params.studentId);
        const attendanceRecords = await Attendance.find({studentId});

        if(attendanceRecords.length === 0) {
            return res.status(404).json({message:"No attendance records found for this student"});
        }

        return res.status(200).json({
            success: true,
            count: attendanceRecords.length,
            data: attendanceRecords
        });
    } catch(error) {
        next(error);
    }
}

// Update an attendance record
const updateAttendance = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;
        const { date, status } = req.body;

        if (!date || !status) {
            return res.status(400).json({
                message: "Both 'date' and new 'status' are required"
            });
        }

        const targetDate = new Date(date);

        // Check whether the date is valid
        if (isNaN(targetDate.getTime())) {
            return res.status(400).json({
                message: "Invalid date format"
            });
        }

        // Define the beginning of the requested day
        const startOfDay = new Date(targetDate);
        startOfDay.setUTCHours(0, 0, 0, 0);

        // Define the beginning of the next day
        const endOfDay = new Date(startOfDay);
        endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

        const updateRecord = await Attendance.findOneAndUpdate(
            {
                studentId,
                date: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            },
            { status },
            { new: true, runValidators: true }
        );

        if (!updateRecord) {
            return res.status(404).json({
                message: "Attendance record not found for this student"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Attendance record updated successfully",
            data: updateRecord
        });

    } catch (error) {
        next(error);
    }
};

//Delete an existing attendance record
const deleteAttendance = async(req, res, next) => {
    try {
        const studentId = decodeURIComponent(req.params.studentId);
        const dateStr = req.query.date || req.body.date;

        if (!dateStr){
            return res.status(400).json({ message: "Date is required to identify the specific Attendance Record"});
        }

        const targetDate = new Date(dateStr);
        targetDate.setUTCHours(0, 0, 0, 0);

        const deleteRecord = await Attendance.findOneAndDelete({
            studentId,
            date: targetDate
        });

        if (!deleteRecord) {
            return res.status(404).json({message: "Attendance record not found for this student"})
        }
        
        return res.status(200).json({
            success: true,
            message: "Attendance record Deleted successfully"
        })
    } catch (error) {
        next(error);
    }
} 

export { checkInStudent, fetchAttendance, getStudentAttendance, updateAttendance, deleteAttendance };
