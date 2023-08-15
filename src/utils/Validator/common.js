import { REGEX } from '../../constants';

export const isPositiveNumber = (value) => REGEX.POSITIVE_NUMBER.test(value);
