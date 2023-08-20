export const isValidTypeOfNumber = <T>(value: T) => !Number.isNaN(value) && typeof value === 'number';

export const isValidTypeOfNumbers = (values: number[]) => values.every((value) => isValidTypeOfNumber(value));
