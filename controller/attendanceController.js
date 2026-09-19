import Attendance from '../models/attendance.js';

// Create a new attendance record
const createAttendance = async (req, res) => {
    try {
        const { studentName, status } = req.body;
        if (!studentName || !status) {
            return res.status(400).json({ message: "Student name and status is required" });
        }
        const attendanceRecord = new Attendance({ studentName, status });
        await attendanceRecord.save(); 
        return res.status(201).json({
            message: "Attendance record created successfully",
            data: attendanceRecord
        })
    } catch (error) {
        return res.status(500).json({ message: "Error creating attendance record", error: error.message });
    }
};

// Fetch all attendance records
const fetchAttendance = async (req, res) => {
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
        return res.status(500).json({
            message: "Error fetching attendance reocrds collection",
            error: error.message
        })
    }
};

// Update an attendance record
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        const updateRecord = await Attendance.findByIdAndUpdate(
            id, req.body, { new: true, runValidators: true } 
        );

        if (!updateRecord) {
            return res.status(404).json({ message: "Attendance record not found" })
        }

        return res.status(200).json({
            message: "Attendance record update successfully",
            data: updateRecord
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Error updating attendance record",
            error: error.message
        });
    }
}

//Delete an existing attendance record
const deleteAttendance = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteRecord = await Attendance.findByIdAndDelete(id);

        if (!deleteRecord) {
            return res.status(404).json({message: "Attendance record NOT FOUND"})
        }
        
        return res.status(200).json({
            message: "Attendance record Deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting attendance record occured",
            error: error.message 
        });
    }
} 

export { createAttendance, fetchAttendance, updateAttendance, deleteAttendance };
