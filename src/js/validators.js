import { LOTTO_LENGTH } from './constants.js';

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

const isAlreadyExist = (lottos) => {
  let flag = false;
  for (let i = 0; i < lottos.length - 1; i++) {
    for (let j = i + 1; j < lottos.length; j++) {
      const tempSet = new Set([...lottos[i], ...lottos[j]]);
      if (tempSet.size === LOTTO_LENGTH) {
        flag = true;
      }
    }
  }
  return flag;
};

export { isValidForNoAmount, isValidForExactAmount, isAlreadyExist };
