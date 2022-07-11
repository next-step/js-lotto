import { LOTTO_PRICE } from './constants/index.js';

const getLottoNumbers = (money) => {
  return money / LOTTO_PRICE;
};

const generateLotto = () => {
  const lotto = [];
  while (true) {
    if (lotto.length === 6) break;
    const number = Math.floor(Math.random() * 45) + 1;

    if (lotto.includes(number)) continue;
    lotto.push(number);
  }
  return lotto;
};

export const generateLottos = (money) => {
  const lottos = [];
  for (let i = 0; i < getLottoNumbers(money); i++) {
    lottos.push(generateLotto());
  }
  return lottos;
};
