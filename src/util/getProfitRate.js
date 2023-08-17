import { DECIMAL_POINT, PERCENTAGE } from '../domain/constants/index.js';

export const getProfitRate = (initialBudget, totalAmount) =>
  (((totalAmount - initialBudget) / initialBudget) * PERCENTAGE).toFixed(DECIMAL_POINT);
