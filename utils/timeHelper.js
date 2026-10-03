const timeToMinutes= (timeString) => {
    if(!timeString || timeString !== 'string') return 0;

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

export {timeToMinutes, getCurrentTimeInMinutes, getDayName };
