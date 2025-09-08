import {
  LINE_SIZE,
  LINE_MINIMUM_NUMBER,
  LINE_MAXIMUM_NUMBER,
} from '../constants/purchase.js';

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
    .split(',')
    .map((number) => Number(number));

  return winningNumbersArray.includes(bonusNumber);
};

export const isValidWinningNumbers = (winningNumbers) => {
  const numbersWithoutEmpty = winningNumbers
    .split(',')
    .filter((number) => number !== '');

  if (numbersWithoutEmpty.length !== LINE_SIZE) {
    throw new Error('숫자를 6개 입력해주세요.');
  }

  if (hasDuplicatedNumbers(numbersWithoutEmpty)) {
    throw new Error('중복되는 숫자는 입력할 수 없습니다.');
  }

  if (isInNumberRange(numbersWithoutEmpty)) {
    throw new Error('1~45 사이의 숫자만 입력 가능합니다.');
  }

  return true;
};

export const isValidBonusNumber = (bonusNumber, winningNumbers) => {
  if (!bonusNumber) {
    throw new Error('보너스 숫자를 입력해주세요.');
  }

  if (isInNumberRange([bonusNumber])) {
    throw new Error('1~45 사이의 숫자만 입력 가능합니다.');
  }

  if (isInWinningNumbers(bonusNumber, winningNumbers)) {
    throw new Error('당첨 번호와 중복되지 않게 입력해주세요.');
  }

  return true;
};
