const isValidForNoAmount = (inputValue) => {
  return !!inputValue;
};

const isValidForExactAmount = (inputValue) => {
  if (Number(inputValue) < 0) {
    return false;
  }
  if (Number(inputValue) % 1000 > 0) {
    return false;
  }
  return true;
};

export { isValidForNoAmount, isValidForExactAmount };
