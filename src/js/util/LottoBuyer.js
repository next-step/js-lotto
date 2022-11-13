import { LOTTO_DELIMITER, MESSAGE } from './Constant.js';

export const buy = (purchasingAmount) => {
  if (purchasingAmount % 1000) throw new Error(MESSAGE.INVALID_AMOUNT_UNIT);

  const amount = purchasingAmount / 1000;
  return getUniqueLottoSets(amount);
};

function getUniqueLottoSets(amount, strict = false) {
  const set = new Set();

  while (set.size < amount) {
    const lotto = getRandomNumbers(6);
    if (strict) lotto.sort((a, b) => a - b);
    set.add(lotto.join(LOTTO_DELIMITER));
  }

  const strLottos = Array.from(set).map((str) => str.split(LOTTO_DELIMITER));
  return strLottos.map((arr) => arr.map((s) => parseInt(s)));
}

function getRandomNumbers(length = 6) {
  const set = new Set();
  while (set.size < length) {
    set.add(Math.floor(Math.random() * 45) + 1);
  }
  return [...set];
}
