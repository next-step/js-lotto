import { LOTTO } from './constants/index.js';

const getLottoNumbers = (money) => {
  return money / LOTTO.PRICE;
};

const generateLotto = () => {
  const lotto = [];
  while (lotto.length < LOTTO.LENGTH) {
    const number = Math.floor(Math.random() * LOTTO.MAX_NUM) + 1;

    if (lotto.includes(number)) continue;
    lotto.push(number);
  }
  return lotto;
};

export const generateLottos = (money) => {
  const lottos = Array.from({ length: getLottoNumbers(money) }, () =>
    generateLotto()
  );

  return lottos;
};
