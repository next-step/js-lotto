import { REGEX } from '../../constants';

export const isPositiveNumber = (value) => REGEX.POSITIVE_NUMBER.test(value);
export const isInRange = ({ number, min, max }) =>
  number >= min && number <= max;
export const isNumbersUnique = (numbers) => {
  return new Set(numbers).size === numbers.length;
};
