import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  Lotto,
  LOTTO_DIGITS,
} from "./Lotto";
import { drawRandomItems } from "../util/Draw";

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

export const calculateProfitRate = (lottoQuantity, totalReward) =>
  (totalReward / (lottoQuantity * LOTTO_PRICE)) * 100;

const checkMoney = (money) => {
  if (!Number.isInteger(money)) {
    throw new Error("정수를 입력해주세요.");
  }

  if (money < LOTTO_PRICE) {
    throw new Error(`구입금액은 ${LOTTO_PRICE}원 이상이어야 합니다.`);
  }
};

const generateLottoNumbers = (count) => {
  const numbersList = [];

  while (numbersList.length < count) {
    const lottoNumbers = Array(LOTTO_MAX_NUMBER)
      .fill()
      .map((_, i) => i + LOTTO_MIN_NUMBER);

    const numbers = drawRandomItems(lottoNumbers, LOTTO_DIGITS);
    numbersList.push(numbers);
  }

  return numbersList;
};
