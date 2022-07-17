import {
  getRandomIndex,
  getPickupElementByIndex,
  compareNumbers,
  reduceByFunctionCompose,
} from '../utils.js';
import {
  BONUS_WEIGHT,
  LOTTO_NUMBERS,
  LOTTO_TRY_COUNT,
  MATCHED_NUMBERS,
} from '../consts.js';
import { LottoData } from './lottoData.js';

const lottoModule = (inputMoney) => {
  const lottoBudget = inputMoney;
  let lottoData = new LottoData();

  const initializeData = () => {
    lottoData = new LottoData();
  };
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

  const addBonusNumberWeight = (result, numbers, bonusNumber, weight) => {
    if (
      result === MATCHED_NUMBERS.FIVE &&
      bonusNumber &&
      +numbers.includes(bonusNumber)
    ) {
      return weight;
    }
    return 0;
  };

  const getWinningResult = (winningNumbers, boughtNumbersSet, bonusNumber) =>
    boughtNumbersSet.map((numbers) => {
      const result = reduceByFunctionCompose(
        numbers,
        0
      )((number) => +winningNumbers.includes(number));

      return (
        result +
        addBonusNumberWeight(result, numbers, bonusNumber, BONUS_WEIGHT)
      );
    });

  return {
    lottoData,
    initializeData,
    isInvalidInputMoneyUnit,
    getTicketNumbersOfBuying,
    getRandomLottoNumbers,
    buyAllLottoByCount,
    getWinningResult,
  };
};

export { lottoModule };
