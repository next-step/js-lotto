import { NUMBER } from '../constants/index.js';

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
        ? { winningNumber: prev.winningNumber, bonusNumber: value }
        : { winningNumber: [...prev.winningNumber, value], bonusNumber: null };
    },
    { winningNumber: [], bonusNumber: null }
  );
};
