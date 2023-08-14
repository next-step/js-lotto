export const getProfitRate = (initialBudget, totalAmount) =>
  (((totalAmount - initialBudget) / initialBudget) * 100).toFixed(1);
