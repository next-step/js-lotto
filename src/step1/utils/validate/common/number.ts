export const isValidTypeOfNumber = (value: number) => !Number.isNaN(value) && typeof value === 'number';

export const isValidTypeOfNumbers = (values: number[]) => values.every((value) => isValidTypeOfNumber(value));
