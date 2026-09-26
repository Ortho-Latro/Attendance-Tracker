import User from '../models/user.js';

// Add student to system
const createStudent = async (req, res, next) => {
    try {
        const { fullName, password } = req.body;
        if(!fullName || !password) {
            return res.status(400).json({ messsage: "Please provide Full name and temporary password of the student"});
        }
        const newStudent = await User.create({ 
            fullName, 
            passwordHash: password 
        });


        return res.status(201).json({ 
            message: "User created successfully",
            student: {
                id: newStudent._id,
                fullName: newStudent.fullName,
                studentId: newStudent.studentId,
                role: newStudent.role
            }
        });
        
    } catch (error) {
        next(error);
    }
}

// Listing all students from the system
const getAllStudents = async (req, res, next) => {
    try {
        const students = await User.find(
            {role:'user'}
            .select('-passwordHash')
            .sort({ createdAt: -1 })
        );
        return res.status(200).json({
            success: 'true',
            message: "Students list retrieved successfully",
            count: students.length,
            list: students 
        });

    } catch (error) {
        next(error);
    }
}


// Retrieve a single student info.
const getStudentById = async (req, res, next) => {
    try {
        const {studentId} = req.params;
        const student = await User.find(
            {studentId}
            .select('-passwordHash')
        );

        if(!student) {
            return res.status(404).json({message: "Studnet NOT FOUND"});
        }

        return res.status(200).json({
            message: "Student information is retrieved succesfully",
            student
        })
    } catch(error) {
        next(error);
    }
} 

export {createStudent, getAllStudents, getStudentById};