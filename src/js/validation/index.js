import { LOTTO_UNIT_PRICE } from '../constant/index.js';

export const isValidPurchasable = (amount) => amount % LOTTO_UNIT_PRICE === 0;

export const isValidNonDuplicateNumbers = (winningNumbers, bonusNumber) =>
  new Set([...winningNumbers, bonusNumber]).size === 7;
