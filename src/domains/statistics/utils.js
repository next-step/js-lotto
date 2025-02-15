export const getProfitRate = (initialAmount, finalAmount) => {
  const profitPercent = ((finalAmount - initialAmount) / initialAmount) * 100;

  return profitPercent % 1 === 0
    ? profitPercent
    : Math.floor(profitPercent * 10) / 10;
};
