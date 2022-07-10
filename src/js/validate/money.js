export const validateMoney = (money) => {
  if (money % 1000 === 0) {
    return true;
  }
  return false;
};
