import { NUMBER, ERROR_MESSAGES } from '../constants/index.js';

export const getPrice = (price) => {
  if (!price) return alert(ERROR_MESSAGES.EMPTY);
  if (price < NUMBER.MIN_PRICE) return alert(ERROR_MESSAGES.MIN_PRICE);
  if (price > NUMBER.MAX_PRICE) return alert(ERROR_MESSAGES.MAX_PRICE);
  if (price % NUMBER.MIN_PRICE !== 0) return alert(ERROR_MESSAGES.BUY_UNIT);

  return price;
};

export const getCount = (price) => price / NUMBER.MIN_PRICE;

export const createLottoList = (count) => {
  const lottoList = [];
  for (let i = 0; i < count; i++) {
    const lotto = [];
    while (lotto.length < NUMBER.LOTTO_LENGTH) {
      const num = Math.floor(Math.random() * 44) + 1;
      if (lotto.indexOf(num) < 0) {
        lotto.push(num);
      }
    }
    lottoList.push(lotto);
  }
  return lottoList;
};
