import { NUMBER, PRIZE_MONEY } from '../constants/index.js';
import { chunkArray } from '../utils/index.js';

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
  return Array.from({ length: count }, () => createLotto());
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

const getWinningCount = (lottoNumber, winningNumber) => {
  return winningNumber.reduce((prev, cur) => {
    if (lottoNumber.includes(cur)) {
      prev.add(cur);
    }
    return prev;
  }, new Set()).size;
};

const getRank = (lottoNumber, winningNumber) => {
  const winningCount = getWinningCount(lottoNumber, winningNumber.number);

  if (winningCount === 6) {
    return 1;
  }
  if (winningCount === 5 && inputNumber.includes(winningNumber.bonusNumber)) {
    return 2;
  }

  return Math.abs(winningCount - NUMBER.LOTTO_LENGTH) + 2;
};

export const getRankBoard = ({ lottoList, winningNumber }) =>
  lottoList
    .map((lottoNumber) => getRank(lottoNumber, winningNumber))
    .reduce(
      (prev, rank) => {
        prev[rank] += 1;
        return prev;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );

export const getPriceRate = (price, rankBoard) => {
  const winningPrice = Object.values(rankBoard).reduce((prev, cur, index) => {
    if (cur !== 0 && PRIZE_MONEY[index + 1]) {
      return prev + PRIZE_MONEY[index + 1] * cur;
    }
    return prev;
  }, 0);

  return (Number(winningPrice) / Number(price)) * 100 - 100;
};

export const getManualLottoList = ($inputNumberNodes) => {
  if (!$inputNumberNodes) return [];

  const manualNumberArr = Array.from($inputNumberNodes).map(({ value }) => Number(value));
  const chunkNumbers = chunkArray(manualNumberArr, 6);
  return chunkNumbers.map((numbers) => numbers.sort((a, b) => a - b));
};
