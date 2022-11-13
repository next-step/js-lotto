import { LOTTO_DELIMITER, MESSAGE } from './Constant.js';

export const buy = (purchasingAmount) => {
  if (purchasingAmount % 1000) throw new Error(MESSAGE.INVALID_AMOUNT_UNIT);

  const amount = purchasingAmount / 1000;
  return getUniqueLottoSets(amount);
};

function getUniqueLottoSets(amount) {
  const set = new Set();

  while (set.size < amount) {
    const lotto = getRandomNumbers(6);
    set.add(lotto.join(LOTTO_DELIMITER));
  }

  return [...set].map((s) => s.split(LOTTO_DELIMITER));
}

function getRandomNumbers(length = 6) {
  const set = new Set();
  while (set.size < length) {
    set.add(Math.floor(Math.random() * 45) + 1);
  }
  return [...set];
}
