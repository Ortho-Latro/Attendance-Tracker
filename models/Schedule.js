import mongoose from 'mongoose';

const timeWindowSchema = new mongoose.Schema({
    days: [{
        type: String,
        enum: ['Friday', 'Saturday', 'Sunday'],
        required: true 
    }],
    startTime: {
        type: String, 
        required: true
    },
    lateThreshold: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
}, {_id: false });

const scheduleSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    regularSchedule : [timeWindowSchema],
    
    temporaryOverrides: [{
        title: {
            type: String,
            default: 'Temporary Session'
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true
        },
        days: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        }],
            startTime: {
            type: String, 
            required: true
        },
            lateThreshold: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;