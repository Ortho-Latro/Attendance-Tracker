import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { getEthiopianYearTwoDigits } from '../utils/ethDateHelper.js';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
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
    }}, {timestamps: true});

// Auto-generate studentID 
userSchema.pre('save', async function () {
    if (this.isNew && this.role == 'user' && !this.studentId) {
        return;
    }

    try {
        const ethYear = getEthiopianYearTwoDigits();
        const lastStudent = await mongoose.model('User').findOne({
            studentId: new RegExp(`/${ethYear}`),
        }).sort({createdAt: -1});

        let nextNumber = 1;

        if(lastStudent && lastStudent.studentId) {
            const parts = lastStudent.studentId.split('/');
            const lastNumber = parseInt(parts[1], 10);
            nextNumber = lastNumber + 1;
        }

        const formattedNumber = String(nextNumber).padStart(4, '0');
        this.studentId = `መርሐ/${formattedNumber}/${ethYear}`;
        
    } catch(error) {
        throw error;
    }
});

// Password Hashing
userSchema.pre('save', async function () {
    if (!this.isModified('passwordHash') || this.passwordHash.startsWith('$2b$')) {
        return;
    }   
    try {
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    } catch(error) {
        throw error;
    }
});

const User = mongoose.model('User', userSchema);
export default User;