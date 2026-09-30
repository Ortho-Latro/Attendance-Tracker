import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        trim: true
    }, 
    status: {
        enum: ['present', 'absent', 'late', 'excused'],
        type: String,
        default: 'present',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

attendanceSchema.index({ studentId:1, date:1 }, {unique:true});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
