import { REGEX, NUMBER } from '../../constants';

export const isPositiveNumber = (value) => REGEX.POSITIVE_NUMBER.test(value);
export const isInRange = (number, min, max) => number >= min && number <= max;
export const isNumbersUnique = (numbers) => {
  return new Set(numbers).size === numbers.length;
};
export const isLottoNumber = (number) =>
  isInRange(
    number,
    NUMBER.LOTTO_TICKET.MIN_RANGE,
    NUMBER.LOTTO_TICKET.MAX_RANGE
  );
