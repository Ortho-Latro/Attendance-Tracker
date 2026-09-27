import 'dotenv/config';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const seedAdmin = async () => {
    try {
        const adminId = process.env.ADMIN_ID;

        const exisitngAdmin = await User.findOne({
            $or: [
                { studentId: adminId },
                { fullName: process.env.ADMIN_FULL_NAME }
            ]
        })

        if (exisitngAdmin) {
            console.log('Admin accoutn already existed');
            return;
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        await User.create({
            fullName: process.env.ADMIN_FULL_NAME,
            studentId: adminId,
            passwordHash: hashedPassword,
            role: 'admin'
        })

        console.log("Admin account seeded successfully");
    } catch (error) {
        console.error("Error seeding admin: ",  error.message);
    }
};

export {seedAdmin};