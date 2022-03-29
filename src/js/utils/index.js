export const isRangeNumberInLotto = (number) => {
  if (isNaN(number)) return false;
  const regex = /\b([1-9]|[123][0-9]|4[0-5])\b/;
  return regex.test(number);
};

export const getSelector = (selector) => document.querySelector(selector);

export const getPriceRate = (price, winningPrice) => (winningPrice / price) * 100 - 100;
