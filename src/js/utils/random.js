import { LOTTO_LENGTH, MAX_LOTTO } from '../constants/lotto.js';

export const createRandomNumbers = () => {
  const lotto = new Set();

  while (lotto.size !== LOTTO_LENGTH) {
    let num = Math.floor(Math.random() * MAX_LOTTO) + 1;
    lotto.add(num);
  }
  return lotto;
};

export const createLottos = (count) => {
  const lottos = [];
  for (let i = 0; i < count; i++) {
    lottos.push([...createRandomNumbers()]);
  }
  return lottos;
};
