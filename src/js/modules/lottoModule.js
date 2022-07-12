import {
  getRandomIndex,
  getPickupElementByIndex,
  compareNumbers,
} from '../utils.js';
import { LOTTO_NUMBERS, LOTTO_TRY_COUNT } from '../consts.js';

const lottoModule = (inputMoney) => {
  const lottoBudget = inputMoney;

  const isInvalidInputMoneyUnit = (lottoTicketPrice, inputValue = inputMoney) =>
    inputValue % lottoTicketPrice > 0;

  const getTicketNumbersOfBuying = (perTicketValue, inputValue = lottoBudget) =>
    Math.floor(inputValue / perTicketValue);

  const getRandomLottoNumbers = (tryCount, refLottoNumbers) => {
    let copyLottoArray = refLottoNumbers.slice();
    const resultLottoNumber = [];

    const getNextLottoNumber = (leftNumbers) => {
      if (resultLottoNumber.length === tryCount) {
        return resultLottoNumber.sort(compareNumbers);
      }

      const selectedNumberIndex = getRandomIndex(leftNumbers);
      resultLottoNumber.push(
        getPickupElementByIndex(leftNumbers, selectedNumberIndex)
      );
      return getNextLottoNumber(leftNumbers);
    };
    return getNextLottoNumber(copyLottoArray);
  };

  const buyAllLottoByCount = (count) =>
    Array.from({ length: count }).map(() => {
      return getRandomLottoNumbers(LOTTO_TRY_COUNT, LOTTO_NUMBERS);
    });

  return {
    isInvalidInputMoneyUnit,
    getTicketNumbersOfBuying,
    getRandomLottoNumbers,
    buyAllLottoByCount,
  };
};

export { lottoModule };
