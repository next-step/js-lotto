import { isNumber, isPositiveInteger } from '../../utils';
import {
  LOTTO_LENGTH,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_NUMBERS,
} from './constants';

const isLottoNumberRange = (value) =>
  value >= LOTTO_MIN_NUMBER && value <= LOTTO_MAX_NUMBER;

export const getRandomLottoNumber = (availableNumbers) => {
  if (!Array.isArray(availableNumbers) || !availableNumbers.length > 0) {
    console.log(availableNumbers);
    throw new Error('로또 번호를 생성하면서 문제가 생겼습니다.');
  }

  const selectedIndex = Math.floor(Math.random() * availableNumbers.length);
  const selectedNumber = availableNumbers[selectedIndex];

  if (
    !isNumber(selectedNumber) ||
    !isPositiveInteger(selectedNumber) ||
    !isLottoNumberRange(selectedNumber)
  ) {
    throw new Error('로또 번호를 생성하면서 문제가 생겼습니다.');
  }

  return selectedNumber;
};

export const getLotto = () => {
  const lottoNumberStocks = LOTTO_NUMBERS;

  const selectedNumbers = Array.from({ length: LOTTO_LENGTH }, () => {
    const selectedNumber = getRandomLottoNumber(lottoNumberStocks);
    const removeIndex = lottoNumberStocks.indexOf(selectedNumber);

    lottoNumberStocks.splice(removeIndex, 1);

    return selectedNumber;
  });

  selectedNumbers.sort((a, b) => a - b);

  return selectedNumbers;
};
