import {
  getRandomIndex,
  getPickupElementByIndex,
  compareNumbers,
} from '../utils.js';

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

  return {
    isInvalidInputMoneyUnit,
    getTicketNumbersOfBuying,
    getRandomLottoNumbers,
  };
};

export { lottoModule };
