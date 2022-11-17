import { LOTTO } from './constants.js';

const purchaseLotto = (amount) => {
  return amount / LOTTO.MIN_PRICE;
};

const getLottoNumbers = () => {
  const lottoNumbers = [];
  while (lottoNumbers.length !== LOTTO.LENGTH) {
    const randomNumber = Math.floor(
      Math.random() * (LOTTO.MAX_VALUE - LOTTO.MIN_VALUE) + LOTTO.MIN_VALUE
    );
    if (!lottoNumbers.includes(randomNumber)) {
      lottoNumbers.push(randomNumber);
    }
  }
  return lottoNumbers;
};

export { purchaseLotto, getLottoNumbers };
