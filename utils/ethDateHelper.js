const getEthiopianYearTwoDigits = (date = new Date()) => {
    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1; // (Jan = 1, Sep = 9)
    const gDay = date.getDate();

    const isAfterEnkutatash = (gMonth > 9) || (gMonth == 9 && gDay >= 11);
    const ethYear = isAfterEnkutatash ? gYear - 7: gYear - 8;
    return ethYear.toString().slice(-2);
};

export {getEthiopianYearTwoDigits};