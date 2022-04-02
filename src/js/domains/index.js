import { NUMBER, PRIZE_MONEY } from '../constants/index.js';

export const getCount = (price) => price / NUMBER.MIN_PRICE;

const createLotto = () => {
  const lotto = new Set();
  while (lotto.size < NUMBER.LOTTO_LENGTH) {
    const num = Math.floor(Math.random() * 44) + 1;
    lotto.add(num);
  }
  return [...lotto].sort((a, b) => a - b);
};

export const createLottoList = (count) => {
  return Array.from({ length: count }, (lotto) => createLotto());
};

export const getWinningNumber = ($inputNumberNodes) => {
  return Array.from($inputNumberNodes).reduce(
    (prev, { value }, index) => {
      if (!value) return prev;

      return index === NUMBER.LOTTO_LENGTH
        ? { winningNumber: prev.winningNumber, bonusNumber: Number(value) }
        : { winningNumber: [...prev.winningNumber, Number(value)], bonusNumber: null };
    },
    { winningNumber: [], bonusNumber: null }
  );
};

const getWinningCount = (winningNumber, inputWinningNumber) => {
  return winningNumber.reduce((prev, cur) => {
    if (inputWinningNumber.includes(cur)) {
      prev.add(cur);
    }
    return prev;
  }, new Set()).size;
};

export const getRank = (inputNumber, winningNumber, bonusNumber) => {
  const winningCount = getWinningCount(winningNumber, inputNumber.winningNumber);

  if (winningCount === 6) {
    return 1;
  }
  if (winningCount === 5 && bonusNumber === inputNumber.bonusNumber) {
    return 2;
  }

  return Math.abs(winningCount - NUMBER.LOTTO_LENGTH) + 2;
};

export const getPriceRate = (price, rank) => {
  const winningPrice = Object.values(rank).reduce((prev, cur, index) => {
    if (cur !== 0) {
      return prev + PRIZE_MONEY[index + 1] * cur;
    }
    return prev;
  }, 0);
  return (Number(winningPrice) / Number(price)) * 100 - 100;
};
