import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res, next) => {
    try {
        const { studentId, password } = req.body;
        if(!studentId || !password) {
            return res.status(400).json({message: "Please provide both Student ID and password"});
        }
        const user = await User.findOne({studentId});
        if(!user) {
            return res.status(401).json({message: "Invalid student ID or password"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if(!isPasswordValid) {
            return res.status(401).json({message:"Invalid student ID or password"});
        }
        const payload = {
            id: user._id,
            studentId: user.studentId,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {expiresIn: '1d' }
        )

        return res.status(200).json({
            message: 'Login Successfully',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                studentId: user.studentId,
                role: user.role
            }
        });

    } catch(error) {
        next(error);
    }
}

export {loginUser};