import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        trim: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    activeDays: {
        type: [String],
        required: true,
        enum: ['Friday', 'Saturday', 'Sunday']
    },

    startTime: {
        type: String,
        required: true,
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please provide a 24 - hour format.']
    },

    lateThreshold: {
        type: String,
        required: true,
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please provide a 24 - hour format.']
    },

    endTime: {
        type: String,
        required: true,
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please provide a 24 - hour format.']
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;