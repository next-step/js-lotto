export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;

const isNumber = (value) =>
  value !== null && value !== undefined && !isNaN(value);
const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;

const isLottoNumberRange = (value) =>
  value >= LOTTO_MIN_NUMBER && value <= LOTTO_MAX_NUMBER;

export const getRandomLottoNumber = (manualNumber) => {
  if (
    !isNumber(manualNumber) ||
    !isPositiveInteger(manualNumber) ||
    !isLottoNumberRange(manualNumber)
  ) {
    throw new Error('로또 번호를 생성하면서 문제가 생겼습니다.');
  }

  return manualNumber;
};
