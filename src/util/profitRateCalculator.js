export const profitRateCalculator = (initialBudget, totalAmount) =>
  (((totalAmount - initialBudget) / initialBudget) * 100).toFixed(1);
