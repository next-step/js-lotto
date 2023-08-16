import { LOTTO_NUMBER_RANGE } from '../constants/lotto-config';

export const isBeyondNumberRange = (value) =>
  value < LOTTO_NUMBER_RANGE.MIN || value > LOTTO_NUMBER_RANGE.MAX || isNaN(+value);
