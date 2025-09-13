import { Lotto } from "../../Lotto/index.js";

export const generateLottoNumbers = () => {
  return Array.from({ length: 45 }, (_, index) => index + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, Lotto.SIZE)
    .sort((a, b) => a - b);
};
