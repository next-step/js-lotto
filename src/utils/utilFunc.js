import {
  ERROR_MESSAGE,
  MIN_PURCHASE_PRICE,
  MAX_PURCHASE_PRICE,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from "./constants.js";

export const isValidPrice = (price) => {
  if (price === "") {
    alert(ERROR_MESSAGE.EMPTY_PRICE);
    return false;
  }

  if (price < MIN_PURCHASE_PRICE || MAX_PURCHASE_PRICE < price) {
    alert(ERROR_MESSAGE.OUT_OF_AMOUNT_RANGE);
    return false;
  }

  if (price % MIN_PURCHASE_PRICE !== 0) {
    alert(ERROR_MESSAGE.NOT_IN_UNITS_OF);
    return false;
  }

  return true;
};

export const isValidWinningNumber = (numberList, bonusNumber, winningSet) => {
  numberList.forEach((number) => {
    if (number === "") {
      alert(ERROR_MESSAGE.EMPTY_WINNING_NUMBER);
      return false;
    }

    if (number < MIN_LOTTO_NUMBER || MAX_LOTTO_NUMBER < number) {
      alert(ERROR_MESSAGE.WINNING_NUMBER_RANGE);
      return false;
    }
  });

  if (bonusNumber.value === "") {
    alert(ERROR_MESSAGE.EMPTY_BONUS_NUMBER);
    return false;
  }

  if (
    bonusNumber.value < MIN_LOTTO_NUMBER ||
    MAX_LOTTO_NUMBER < bonusNumber.value
  ) {
    alert(ERROR_MESSAGE.WINNING_NUMBER_RANGE);
    return false;
  }

  if (winningSet.size !== numberList.length) {
    alert(ERROR_MESSAGE.DUPLICATED_WINNING_NUMBER);
    return false;
  }

  return true;
};

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const generateRandomNumbers = () => {
  const newLottoNumbers = Array.from({ length: 6 }, () => {
    return generateRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER);
  });

  return newLottoNumbers;
};

export const generateLottoNumbers = (amounts) => {
  const lottoTicketsList = [...new Array(amounts)].map(() => {
    return generateRandomNumbers();
  });

  return lottoTicketsList;
};
