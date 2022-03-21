import { LOTTO_PRICE, LOTTO_NUMBERS_LIMIT, LOTTO_COUNTS } from './constants';
import NOT_ALLOWED_PAY_UNIT from './messageConstants';

const pay = (paidPrice) => {
  if (!isValidatePaidPrice(paidPrice)) {
    alert(NOT_ALLOWED_PAY_UNIT);
    return;
  }

  const counts = paidPrice / LOTTO_PRICE;

  return makeLottoCards(counts);
};

const isValidatePaidPrice = (paidPrice) => {
  return paidPrice % LOTTO_PRICE === 0 && paidPrice > 0;
};

const makeLottoCards = (counts) => {
  const result = [];

  while (result.length < counts) {
    result.push(makeRandomLottoNumbers());
  }

  return result;
};

const makeRandomLottoNumbers = () => {
  const result = [];

  while (result.length < LOTTO_COUNTS) {
    const randomNumber = Math.floor(Math.random() * LOTTO_NUMBERS_LIMIT + 1);

    if (result.includes(randomNumber)) continue;
    result.push(randomNumber);
  }

  return result.sort((a, b) => a - b);
};

export { pay, isValidatePaidPrice, makeLottoCards, makeRandomLottoNumbers };
