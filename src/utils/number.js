export const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const isPositiveNumber = (value) => /^[1-9][0-9]*$/.test(value);
