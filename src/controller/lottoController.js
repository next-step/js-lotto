import { calcLottoCount, createRandomLottoNumber } from "../utils/calculate.js";
import { showBuyedLottoCountMessage } from "../utils/consoleMessage.js";
import {
  checkInputValueType,
  checkInputValueUnit,
  isValidAmount,
} from "../utils/validate.js";

export const processLottoPurchase = (price) => {
  const lottoCount = calcLottoCount(price);
  return showBuyedLottoCountMessage(lottoCount);
};

export const validateInputPrice = (price) => {
  try {
    checkInputValueType(price);
    isValidAmount(price);
    checkInputValueUnit(price);

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

// 살 수 있는 갯수만큼 로또 생성하기
export const createLottosForAmount = (lottoCount) => {
  let lottoNumbers = [];

  for (let i = 0; i < lottoCount; i++) {
    lottoNumbers.push(createLottoNumbers());
  }

  return lottoNumbers;
};

// 로또 만들고 출력하기
export const createLottoNumbers = () => {
  let lottoNumbers = [];

  while (lottoNumbers.length < 6) {
    const randomNumber = createRandomLottoNumber();

    if (!lottoNumbers.includes(randomNumber)) {
      lottoNumbers.push(randomNumber);
    }
  }

  return lottoNumbers;
};
