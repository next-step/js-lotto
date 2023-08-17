import { calcLottoCount, createRandomLottoNumber } from "../utils/calculate.js";
import { showBuyedLottoCountMessage } from "../utils/consoleMessage.js";
import {
  checkInputPriceType,
  checkInputPriceUnit,
  isValidAmount,
  isValidWinningNumberLength,
  isValidWinningNumberRange,
  isWinningNumbersDuplicate,
  isWinningAndBonusNumberDuplicate,
} from "../utils/validate.js";

export const processLottoPurchase = (price) => {
  const lottoCount = calcLottoCount(price);
  return showBuyedLottoCountMessage(lottoCount);
};

export const validateInputPrice = (price) => {
  try {
    checkInputPriceType(price);
    isValidAmount(price);
    checkInputPriceUnit(price);

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

export const validateInputWinningNumbers = (winningNumbers) => {
  try {
    isValidWinningNumberLength(winningNumbers);
    isValidWinningNumberRange(winningNumbers);
    isWinningNumbersDuplicate(winningNumbers);

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const validateInputBonusNumber = (winningNumbers, bonusNumber) => {
  try {
    isWinningAndBonusNumberDuplicate(winningNumbers, bonusNumber);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
