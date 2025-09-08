import {
  LINE_SIZE,
  LINE_MINIMUM_NUMBER,
  LINE_MAXIMUM_NUMBER,
  PURCHASE_ERROR_MESSAGE,
} from '../constants/purchase.js';
import { DELIMITER } from '../constants/common.js';

const hasDuplicatedNumbers = (winningNumbersArray) => {
  return new Set(winningNumbersArray).size !== winningNumbersArray.length;
};

const isInNumberRange = (numbers) => {
  const outOfRangeNumbers = numbers.filter(
    (number) => number < LINE_MINIMUM_NUMBER || number > LINE_MAXIMUM_NUMBER,
  );

  return outOfRangeNumbers.length > 0;
};

const isInWinningNumbers = (bonusNumber, winningNumbers) => {
  const winningNumbersArray = winningNumbers
    .split(DELIMITER)
    .map((number) => Number(number));

  return winningNumbersArray.includes(bonusNumber);
};

export const isValidWinningNumbers = (winningNumbers) => {
  const numbersWithoutEmpty = winningNumbers
    .split(DELIMITER)
    .filter((number) => number !== '');

  if (numbersWithoutEmpty.length !== LINE_SIZE) {
    throw new Error(PURCHASE_ERROR_MESSAGE.WINNING_SIZE);
  }

  if (hasDuplicatedNumbers(numbersWithoutEmpty)) {
    throw new Error(PURCHASE_ERROR_MESSAGE.WINNING_DUPLICATION);
  }

  if (!isInNumberRange(numbersWithoutEmpty)) {
    throw new Error(PURCHASE_ERROR_MESSAGE.RANGE);
  }

  return true;
};

export const isValidBonusNumber = (bonusNumber, winningNumbers) => {
  if (!bonusNumber) {
    throw new Error(PURCHASE_ERROR_MESSAGE.BONUS_EMPTY);
  }

  if (!isInNumberRange([bonusNumber])) {
    throw new Error(PURCHASE_ERROR_MESSAGE.RANGE);
  }

  if (isInWinningNumbers(bonusNumber, winningNumbers)) {
    throw new Error(PURCHASE_ERROR_MESSAGE.BONUS_DUPLICATION);
  }

  return true;
};
