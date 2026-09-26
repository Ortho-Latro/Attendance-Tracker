import 'dotenv/config';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({
            $or: [
                { studentId: process.env.ADMIN_ID},
                { fullName: "Admin"}
            ]
        });

        if (adminExists) {
            console.log("Admin account already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        await User.create({
            studentId: process.env.ADMIN_ID,
            fullName: 'Admin',
            passwordHash: hashedPassword,
            role: 'admin' 
        })
        console.log("Default Admin account created successfully!");
    } catch(error) {
        console.log("Admin seeding failed: ",error.message);
    }
}; 

export {seedAdmin};