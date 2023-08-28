export const isNaturalNumber = (number) => {
    return Number.isInteger(Number(number)) && Number(number) > 0;
}

export const isValidNumberString = (numberString) => {
    const pattern = /^[0-9]+$/;
    return pattern.test(numberString);
}