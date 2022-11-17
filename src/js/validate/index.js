import { LOTTO } from '../constants/index.js';

export const validateMoney = (money) => {
  return money % LOTTO.PRICE === 0;
};

export const validateWinning = (winningNumbers, bonusNumber) => {
  const numbers = winningNumbers.concat(bonusNumber);
  const numbersUnique = numbers.filter((num, i) => numbers.indexOf(num) === i);
  return numbers.length === numbersUnique.length;
};
