import Lotto from "./Lotto.js";

export const generateLottoNumbers = () => {
  return Array.from({ length: Lotto.LOTTO_MAX_NUMBER }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, Lotto.LOTTO_LENGTH)
    .sort((a, b) => a - b);
};
