export const isValidPurchaseAmount = (purchaseAmount) => {
  if (purchaseAmount % 1000 !== 0) {
    return false;
  }
  return true;
};

export const getRandomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};
