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

export const getNumbersList = (lottos) => lottos.map((e) => e.numbers);

export const getLottoRanks = (lottos, winningNumbers, bonusNumber) =>
  lottos.map((e) => e.compare(winningNumbers, bonusNumber));

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

    const numbers = drawNotDuplicatedItems(lottoNumbers, LOTTO_DIGITS);
    const sortedNumbers = numbers.toSorted((a, b) => a - b);
    numbersList.push(sortedNumbers);
  }

  return numbersList;
};
