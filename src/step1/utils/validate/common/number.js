export const isValidTypeOfNumber = (value) => !Number.isNaN(value) && typeof value === 'number';

export const isValidTypeOfNumbers = (values) => values.every((value) => isValidTypeOfNumber(value));
