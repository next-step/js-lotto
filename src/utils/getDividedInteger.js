export const getDividedInteger = (dividend, divisor) => {
  if (divisor === 0) {
    throw new Error('0으로 나눌 수 없습니다.');
  }

  return Math.floor(dividend / divisor);
};
