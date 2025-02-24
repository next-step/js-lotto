import LottoNumber from "./LottoNumber.js";
import Lotto from "./Lotto.js";

const LOTTO_SIZE = 6;

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateNumbers = () => {
  return shuffleArray(LottoNumber.CACHE).slice(0, LOTTO_SIZE);
};

const generateLottos = (count) => {
  return Array.from({ length: count }, () => new Lotto(generateNumbers()));
};

export { generateNumbers, generateLottos };
