import { LOTTO } from "./constants.js";

export const getLottoRandomNumber = () => {
  return Math.floor(Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + 1);
};
