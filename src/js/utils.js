export const isValidPurchaseAmount = (purchaseAmount) => {
  return purchaseAmount > 0 && purchaseAmount % 1000 === 0;
};

export const getRandomNumbers = (maxNumber) => {
  return Array(maxNumber)
    .fill()
    .map((number, idx) => idx + 1);
};

export const shuffle = (array, count) => {
  return array.sort(() => Math.random() - 0.5).slice(0, count);
};
