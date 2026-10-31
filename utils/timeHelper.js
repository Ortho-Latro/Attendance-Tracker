const timeToMinutes= (timeString) => {
    if(!timeString || typeof timeString !== 'string') return 0;

    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 60) + minutes;
};

const getCurrentTimeInMinutes= (date = new Date()) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (hours * 60) + minutes;
};

const getDayName = (date = new Date()) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};

const evaluateAttendanceWindow = (schedule) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const todayDayName = getDayName();

    if (schedule.temporaryOverrides && schedule.temporaryOverrides.length > 0) {
        for (let override of schedule.temporaryOverrides) {
            const overrideStart = new Date(override.startDate).toISOString().split('T')[0];
            const overrideEnd = new Date(override.endDate).toISOString().split('T')[0];

            const isDateInRange = currentDate >= overrideStart && currentDate <= overrideEnd;
            const isDayMatch = override.days.includes(todayDayName);

            if (isDateInRange && isDayMatch) {
                return {
                    startTime: override.startTime,
                    lateThreshold: override.lateThreshold,
                    endTime: override.endTime
                };
            }
        }
    }

    if (schedule.regularSchedule && schedule.regularSchedule.length > 0) {
        for (let regular of schedule.regularSchedule) {
            if (regular.days.includes(todayDayName)) {
                return {
                    startTime: regular.startTime,
                    lateThreshold: regular.lateThreshold,
                    endTime: regular.endTime
                };
            }
        }
    }

    return null;
}
export {timeToMinutes, getCurrentTimeInMinutes, getDayName, evaluateAttendanceWindow };
