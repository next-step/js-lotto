import { isNumber, isPositiveInteger } from '../../utils/index.js';
import { LOTTO } from './constants.js';

export const isLottoNumberRange = (value) =>
  value >= LOTTO.RANGE.min && value <= LOTTO.RANGE.max;

export const isValidBonusNumber = (bonusNumber, jackpotNumbers) => {
  return (
    isNumber(bonusNumber) &&
    isPositiveInteger(bonusNumber) &&
    isLottoNumberRange(bonusNumber) &&
    !jackpotNumbers.includes(bonusNumber)
  );
};

export const getRandomLottoNumber = (availableNumbers) => {
  if (!Array.isArray(availableNumbers) || !availableNumbers.length > 0) {
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
  const lottoNumberStocks = [...LOTTO.NUMBERS];

  const selectedNumbers = Array.from({ length: LOTTO.SIZE }, () => {
    const selectedNumber = getRandomLottoNumber(lottoNumberStocks);
    const removeIndex = lottoNumberStocks.indexOf(selectedNumber);

    lottoNumberStocks.splice(removeIndex, 1);

    return selectedNumber;
  });

  selectedNumbers.sort((a, b) => a - b);

  return selectedNumbers;
};
