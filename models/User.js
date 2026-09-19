import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { getEthiopianYearTwoDigits } from '../utils/ethDateHelper.js';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    studentId: {
        type: String, 
        required: true,
        unique: true
    },

    passwordHash: {
        type: String,
        required: true,
        minLength: 6
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }}, {timestamp: true});

// Auto-generate studentID 
userSchema.pre('save', async function (next) {
    if (this.isNew && this.role == 'user' && !this.studentID) {
        return next();
    }

    try {
        const ethYear = getEthiopianYearTwoDigits;
        const lastStudent = await mongoose.model('User').findOne({
            studentId: new RegExp(`/${ethYear}`),
        }).sort({createdAt: -1});

        let nextNumber = 1;

        if(lastStudent && lastStudent.studentId) {
            const parts = lastStudent.studentId.split('/');
            const lastNumber = parsenInt(parts[1], 10);
            nextNumber = lastNumber + 1;
        }

        const formattedNumber = String(nextNumber).padStart(4, '0');
        this.studentId = `መርሐ/${formattedNumber}/${ethYear}`;
        
    } catch(error) {
        next(error);
    }
});

// Password Hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) {
        return next();
    }   
    try {
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        next();
    } catch(error) {
        next(error);
    }
});

const User = mongoose.model('User', attendanceSchema);
export default User;