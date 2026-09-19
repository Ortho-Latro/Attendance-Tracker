import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    status: {
        enum: ['present', 'absent', 'late', 'excused'],
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
