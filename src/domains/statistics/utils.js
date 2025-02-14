export const getProfitRate = (initialAmount, finalAmount) => {
  const profitPercent = ((finalAmount - initialAmount) / initialAmount) * 100;

  return profitPercent;
};
