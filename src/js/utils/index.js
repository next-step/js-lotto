export const range = number => Array.from({ length: number }, (_, i) => i + 1);

export const size = (array = []) => array.length;

export const successOrFailureCurry = value => (success, failure) => {
  try {
    return success(value);
  } catch (e) {
    return failure(e);
  }
};

export const sum = (a, b) => a + b;

export const swap = (maxIdx, i, arr) => {
  const random = Math.floor(Math.random() * maxIdx);
  const last = maxIdx - i;

  [arr[last], arr[random]] = [arr[random], arr[last]];

  return arr;
};

/**
 * 수익률(%) = ((당첨금액 / 투자금액) * 100) - 100;
 * @param {number} totalPrize 당첨금액
 * @param {number} investmentAmount 투자금액
 * @returns number 수익률
 */
export const calculateRateOfProfit = (totalPrize, investmentAmount) =>
  (totalPrize / investmentAmount) * 100 - 100;

export const prizeByCount = ({ count, prize }) => count * prize;
