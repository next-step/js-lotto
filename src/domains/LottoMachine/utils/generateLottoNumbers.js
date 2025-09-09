import {
  MAX_LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
} from "../../Lotto/constants/index.js";

export const generateLottoNumbers = () => {
  const numbers = [];

  while (numbers.length < MAX_LOTTO_NUMBER_COUNT) {
    const number = Math.floor(Math.random() * MAX_LOTTO_NUMBER) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  return numbers.sort((a, b) => a - b);
};
