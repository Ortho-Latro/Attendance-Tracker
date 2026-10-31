import { body, param } from 'express-validator';

const createAttendanceRules = [
    body('studentId') 
        .notEmpty().withMessage('Student ID is requied')
        .matches(/^መርሐ\/\d{4}\/\d{2}$/).withMessage('Invalid student ID format'),
    body('status')
        .notEmpty().withMessage('Attendance status is requied')
        .isIn(['present', 'absent', 'late', 'excused']).withMessage('Status must be either present, absent, late, excused')
];

const updateAttendanceRules = [
    param('studentId')
        .notEmpty().withMessage('Student ID is required')
        .matches(/^መርሐ\/\d{4}\/\d{2}$/).withMessage('Invalid Student ID, check the sample list'),

    body('status')
        .notEmpty()
        .withMessage('Attendance status is required')
        .isIn(['present', 'absent', 'late', 'excused'])
        .withMessage('Status must be present, absent, late, or excused')
];

export { createAttendanceRules, updateAttendanceRules };