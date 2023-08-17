<<<<<<< HEAD
import { SINGLE_LOTTO_PRICE } from "../data/constant.js";
import { LOTTO_PRIZE } from "../data/lotto.js";
import { createRandomLottoNumber } from "../utils/calculate.js";
import {
  isValidWinningNumberLength,
  isValidWinningNumberRange,
  isWinningNumbersDuplicate,
  isWinningAndBonusNumberDuplicate,
  validateInputPriceType,
  validateAmount,
  validateInputPriceUnit,
} from "../utils/validate.js";

export const checkInputPrice = (price) => {
  validateInputPriceType(price);
  validateAmount(price);
  validateInputPriceUnit(price);

  return true;
};

=======
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
>>>>>>> c479370 ([feat] 로또 controller 생성)
export const createLottosForAmount = (lottoCount) => {
  let lottoNumbers = [];

  for (let i = 0; i < lottoCount; i++) {
    lottoNumbers.push(createLottoNumbers());
  }

  return lottoNumbers;
};

<<<<<<< HEAD
=======
// 로또 만들고 출력하기
>>>>>>> c479370 ([feat] 로또 controller 생성)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a1722de ([feat] controller 추가)

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
<<<<<<< HEAD
    isValidWinningNumberRange(winningNumbers);
=======
>>>>>>> a1722de ([feat] controller 추가)
    isWinningAndBonusNumberDuplicate(winningNumbers, bonusNumber);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
<<<<<<< HEAD

export const getWinningPrizeResult = (lottoNumbers, winningNumbers) => {
  const bonusNumber = Number(winningNumbers[winningNumbers.length - 1]);
  const numberForMatch = winningNumbers.slice(0, -1);

  const matchedCount = getLottoNumberMatchCount(lottoNumbers, numberForMatch);
  const hasBonus = getBonusNumberMatchCount(lottoNumbers, bonusNumber);

  return { matchedCount, hasBonus };
};

export const getLottoNumberMatchCount = (lottoNumbers, numberForMatch) => {
  const flattedlottoNumber = [].concat(...lottoNumbers);

  const matchedNumbers = flattedlottoNumber.filter((number) =>
    numberForMatch.includes(number)
  );

  const removeDuplicateMatchNumber = [...new Set(matchedNumbers)];
  const matchedCount = removeDuplicateMatchNumber.length;

  return matchedCount;
};

export const getBonusNumberMatchCount = (lottoNumbers, bonusNumber) => {
  const flattedlottoNumber = [].concat(...lottoNumbers);

  const matchResult = flattedlottoNumber.some(
    (number) => number === bonusNumber
  );

  return matchResult;
};

export const updateLottoPrizeCount = (winningResult) => {
  const { matchedCount, hasBonus } = winningResult;
  const key = getPrizeKey(matchedCount, hasBonus);

  if (key) {
    LOTTO_PRIZE[key].count += 1;
  }
};

export const getPrizeKey = (matchCount, hasBonus) => {
  switch (matchCount) {
    case 3:
      return "5st";
    case 4:
      return "4st";
    case 5:
      return hasBonus ? "2st" : "3st";
    case 6:
      return "1st";
    default:
      return null;
  }
};

export const getTotalWinningPrice = () => {
  let totalWinningPrice = 0;

  Object.values(LOTTO_PRIZE).forEach((prize) => {
    totalWinningPrice += prize.price * prize.count;
  });

  return totalWinningPrice;
};

export const getTotalInvestgatePrice = (avaliableCount) => {
  return SINGLE_LOTTO_PRICE * Number(avaliableCount);
};

export const formatWinningNumbers = (winningNumbers, bonusNumber) => {
  return winningNumbers
    .split(",")
    .map((number) => Number(number.trim()))
    .concat(bonusNumber);
};
=======
>>>>>>> c479370 ([feat] 로또 controller 생성)
=======
>>>>>>> a1722de ([feat] controller 추가)
