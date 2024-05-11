import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  Lotto,
  LOTTO_DIGITS,
} from "./Lotto";
import { drawNotDuplicatedItems } from "../util/Draw";

export const LOTTO_PRICE = 1_000;

export const buyLottos = (money) => {
  checkMoney(money);

  const count = Math.trunc(money / LOTTO_PRICE);
  const numbersList = generateLottoNumbers(count);
  const lottos = numbersList.map((e) => new Lotto(e));

  return lottos;
};

const checkMoney = (money) => {
  if (!Number.isInteger(money)) {
    throw new Error();
  }
};

const generateLottoNumbers = (count) => {
  const numbersList = [];

  while (numbersList.length < count) {
    const lottoNumbers = Array(LOTTO_MAX_NUMBER)
      .fill()
      .map((_, i) => i + LOTTO_MIN_NUMBER);

    const numbers = drawNotDuplicatedItems(lottoNumbers, LOTTO_DIGITS).sort();
    numbersList.push(numbers);
  }

  return numbersList;
};
