import {
  LOTTO_NUMBER_COUNT,
  LOTTO_PRICE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../constant/lotto.js';
import { getRandomNumber } from '../util/random.js';

const generateLottoNumber = () => getRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER);

export const issueLotto = () => [...Array(LOTTO_NUMBER_COUNT)].map(generateLottoNumber);

export const getLottoAmount = (price) => Math.floor(price / LOTTO_PRICE);
