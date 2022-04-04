import { NUMBER, PRIZE_MONEY } from '../constants/index.js';

export const getLottoAmount = (price) => price / NUMBER.MIN_PRICE;

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
        ? { number: prev.number, bonusNumber: Number(value) }
        : { number: [...prev.number, Number(value)], bonusNumber: null };
    },
    { number: [], bonusNumber: null }
  );
};

const getWinningCount = (winningNumber, inputNumber) => {
  return winningNumber.reduce((prev, cur) => {
    if (inputNumber.includes(cur)) {
      prev.add(cur);
    }
    return prev;
  }, new Set()).size;
};

export const getRank = (inputNumber, winningNumber) => {
  const winningCount = getWinningCount(winningNumber.number, inputNumber.number);

  if (winningCount === 6) {
    return 1;
  }
  if (winningCount === 5 && winningNumber.bonusNumber === inputNumber.bonusNumber) {
    return 2;
  }

  return Math.abs(winningCount - NUMBER.LOTTO_LENGTH) + 2;
};

export const getPriceRate = (price, rankBoard) => {
  const winningPrice = Object.values(rankBoard).reduce((prev, cur, index) => {
    if (cur !== 0 && PRIZE_MONEY[index + 1]) {
      return prev + PRIZE_MONEY[index + 1] * cur;
    }
    return prev;
  }, 0);

  return (Number(winningPrice) / Number(price)) * 100 - 100;
};
