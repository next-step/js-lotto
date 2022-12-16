const getOneRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const isWinningBonusNumberDuplicated = (numArray) => {
  return numArray.some(
    (num) => numArray.indexOf(num) !== numArray.lastIndexOf(num)
  );
};

const getLottoProfit = (inputAmount, profitAmount) => {
  return Math.floor(profitAmount - inputAmount / inputAmount) * 100;
};

export { getOneRandomNumber, isWinningBonusNumberDuplicated, getLottoProfit };
