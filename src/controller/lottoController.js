import { SINGLE_LOTTO_PRICE, LOTTO_PRIZE } from "../data/constant.js";
import { createRandomLottoNumber } from "../utils/calculate.js";
import {
  checkInputPriceType,
  checkInputPriceUnit,
  isValidAmount,
  isValidWinningNumberLength,
  isValidWinningNumberRange,
  isWinningNumbersDuplicate,
  isWinningAndBonusNumberDuplicate,
} from "../utils/validate.js";

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

export const createLottosForAmount = (lottoCount) => {
  let lottoNumbers = [];

  for (let i = 0; i < lottoCount; i++) {
    lottoNumbers.push(createLottoNumbers());
  }

  return lottoNumbers;
};

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
    isValidWinningNumberRange(winningNumbers);
    isWinningAndBonusNumberDuplicate(winningNumbers, bonusNumber);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

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

export const getPrizeKey = (matchCount, hasBonus) => {
  console.log(matchCount, hasBonus);
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
