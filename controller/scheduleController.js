import Schedule from "../models/Schedule.js";

const createOrUpdateSchedule = async (req, res) => {
    try {
        const {className, regularSchedule } = req.body;
        if (!className || !regularSchedule || !Array.isArray(regularSchedule) || regularSchedule.length === 0) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide a class name and a regular schedule"
            });
        }
    
        const updatedSchdule = await Schedule.findOneAndUpdate(
            { className: className.trim()},
            { 
                className: className.trim(),
                regularSchedule
            },
            {
                new: true,
                upsert:true,
                runValidators: true 
            }
        );
        return res.status(200).json({
            success: true,
            message: "Regular schedule configured successfully.",
            data: updatedSchdule
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to configure regular schedule."
        });
    }
}

const addTemporarySchedule = async (req, res) => {
    try {
        const {className, title, startDate, endDate, days, startTime, lateThreshold, endTime} = req.body;
        if (!className || !startDate || !endDate || !days || !startTime || !lateThreshold || !endTime ) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the required fields for the temporary schedule form'
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start > end) {
            return res.status(400).json({
                success: false,
                message: "End date can not be earlier than start date."
            });
        }

        const schedule = await Schedule.findOne({ className: className.trim()});
        if(!schedule){
            return res.status(400).json({
                success: false,
                message: `No regular schedule for '${className}'. Please provide a baseline schedule first.`
            });
        }

        const overrideData = {
            title: title || "Temporary Session",
            startDate: start, 
            endDate: end,
            days, 
            startTime,
            lateThreshold,
            endTime
        }

        schedule. temporaryOverrides.push(overrideData);
        await schedule.save();
        return res.status(200).json({
            success: true,
            message: "Temporary schedule is added successfully.",
            data: schedule
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to add temporary schedule."
        });
    }
}


export {createOrUpdateSchedule, addTemporarySchedule};