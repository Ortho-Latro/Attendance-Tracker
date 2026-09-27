import User from "../models/user.js";

const getEthiopianYearTwoDigits = (date = new Date()) => {
    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1; // (Jan = 1, Sep = 9)
    const gDay = date.getDate();

    const isAfterEnkutatash = (gMonth > 9) || (gMonth == 9 && gDay >= 11);
    const ethYear = isAfterEnkutatash ? gYear - 7: gYear - 8;
    return ethYear.toString().slice(-2);
};

const getStudentId = async () => {
    try {
        const ethYear = getEthiopianYearTwoDigits();
        const lastStudent = await User.findOne({
            role: 'user',
            studentId: new RegExp(`/${ethYear}$`),
        }).sort({createdAt: -1});

        let nextNumber = 1;

        if(lastStudent && lastStudent.studentId) {
            const parts = lastStudent.studentId.split('/');
            if (parts.length === 3) {
                const lastNumber = parseInt(parts[1], 10);
                if (!isNaN(lastNumber)){
                    nextNumber = lastNumber + 1;
                }
            }
        }

        const formattedNumber = String(nextNumber).padStart(4, '0');
        return `መርሐ/${formattedNumber}/${ethYear}`;
        
    } catch(error) {
        throw new Error(`Failed to generate student ID: ${error.message}`);
    }
}

export {getStudentId};