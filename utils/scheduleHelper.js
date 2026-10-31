const filterExpiredOverrides = (schedule) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const originalLength = schedule.temporaryOverrides.length;

    schedule.temporaryOverrides = schedule.temporaryOverrides.filter(override =>{
        return override.endDate >= currentDate;
    });

    return schedule.temporaryOverrides.length !== originalLength;
};

export{filterExpiredOverrides};