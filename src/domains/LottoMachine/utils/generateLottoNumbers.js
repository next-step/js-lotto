import { MAX_LOTTO_NUMBER } from "../../Lotto/constants/index.js";

export const generateLottoNumbers = () => {
  return Array.from({ length: MAX_LOTTO_NUMBER }, (_, index) => index + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .sort((a, b) => a - b);
};
