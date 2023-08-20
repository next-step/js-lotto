const PERCENT_MULTIPLY = 100;

export const getPercentage = ({value, total}, fixedNumber = 0) => {
  if (total === 0) {
    throw new Error('total은 0이 될 수 없습니다.');
  }

  return ((value / total) * PERCENT_MULTIPLY).toFixed(fixedNumber);
};
