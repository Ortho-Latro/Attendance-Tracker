import { body, param } from 'express-validator';

const createAttendanceRules = [
    body('studentName') 
        .notEmpty().withMessage('Student name is requied'),
    body('status')
        .notEmpty().withMessage('Attendance status is requied')
        .isIn(['present', 'absent', 'late', 'excused']).withMessage('Status must be either present, absent, late, excused')
];

const updateAttendanceRules = [
    param('id')
        .isMongoId().withMessage('Invalid MongoDB object id in url parameter'),
    body('studentName')
        .optional(),
    body('status')
        .optional()
        .isIn(['present', 'absent', 'late', 'excused']).withMessage('Status must be either present, absent, late, excused')
];

export { createAttendanceRules, updateAttendanceRules };