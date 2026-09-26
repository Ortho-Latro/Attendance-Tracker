import Attendance from '../models/attendance.js';

// Create a new attendance record
const createAttendance = async (req, res, next) => {
    try {
        const { studentId, status } = req.body;
        if (!studentId || !status) {
            return res.status(400).json({ message: "Student ID and status is required" });
        }
        const attendanceRecord = new Attendance({ studentId, status });
        await attendanceRecord.save(); 
        return res.status(201).json({
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
        const attendanceRecords = await Attendance.find();

        if (!attendanceRecords) {
            return res.status(404).json({ 
                message: "Attendance records not found"
            })
        }

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
        const attendanceRecord = await Attendance.findOne({studentId});

        if (!attendanceRecord) {
            return res.status(404).json({ 
                message: "Student attendance record is not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: attendanceRecord
        });
    } catch(error) {
        next(error);
    }
}

// Update an attendance record
const updateAttendance = async (req, res, next) => {
    try {
        const { studentId } = req.params;

        const updateRecord = await Attendance.findOneAndUpdate(
            {studentId}, 
            req.body, 
            { new: true, runValidators: true } 
        );

        if (!updateRecord) {
            return res.status(404).json({ message: "Attendance record not found" })
        }

        return res.status(200).json({
            message: "Attendance record update successfully",
            data: updateRecord
        });
    } catch (error) {
        next(error);
    }
}

//Delete an existing attendance record
const deleteAttendance = async(req, res) => {
    try {
        const { studentId } = req.params;
        const deleteRecord = await Attendance.findOneAndDelete(studentId);

        if (!deleteRecord) {
            return res.status(404).json({message: "Attendance record NOT FOUND"})
        }
        
        return res.status(200).json({
            message: "Attendance record Deleted successfully"
        })
    } catch (error) {
        next(error);
    }
} 

export { createAttendance, fetchAttendance, getStudentAttendance, updateAttendance, deleteAttendance };
