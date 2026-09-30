import Attendance from '../models/attendance.js';

// Create a new attendance record
const createAttendance = async (req, res, next) => {
    try {
        const { studentId, status, date } = req.body;
        if (!studentId || !status) {
            return res.status(400).json({ message: "Student ID and status is required" });
        }

        const recordDate = date ? new Date(date) : newDate();
        recordDate.setUTCHours(0, 0, 0, 0);

        const existingRecord = await Attendance.findOne({
            studentId,
            date: recordDate
        });

        if(existingRecord) {
            return res.status(400).json({message: "Attendance record already exisits for this specific student today"});
        }

        const attendanceRecord = new Attendance({ studentId, 
        status,
        date: recordDate
    });
        await attendanceRecord.save(); 
        return res.status(201).json({
            success: true,
            message: "Attendance record created successfully",
            data: attendanceRecord
        })
    } catch (error) {
        next(error);
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
        const studentId = decodeURIComponent(req.params.studentId);
        const { date, status } = req.body;

        if (!date || !status) {
            return res.status(400).json({message: "Both 'date' and new 'status' are required"});
        }

        const targetDate = new Date(date);
        targetDate.setUTCHours(0, 0, 0, 0);

        const updateRecord = await Attendance.findOneAndUpdate(
            { studentId, date: targetDate },
            { status },
            { new: true, runValidators: true }
        );

        if (!updateRecord) {
            return res.status(404).json({ message: "Attendance record not found for this student" });
        }

        return res.status(200).json({
            success: true, 
            message: "Attendance record update successfully",
            data: updateRecord
        });
    } catch (error) {
        next(error);
    }
}

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

export { createAttendance, fetchAttendance, getStudentAttendance, updateAttendance, deleteAttendance };
