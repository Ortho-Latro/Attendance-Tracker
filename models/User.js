import mongoose from 'mongoose';

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
    
const User = mongoose.model('User', userSchema);
export default User;