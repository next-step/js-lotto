import LottoNumber from "./LottoNumber.js";
import Lotto from "./Lotto.js";

class LottoGenerator {
  static LOTTO_SIZE = 6;

  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  static generateNumbers() {
    return this.shuffleArray(LottoNumber.CACHE).slice(0, this.LOTTO_SIZE);
  }

  static generateLottos(count) {
    return Array.from(
      { length: count },
      () => new Lotto(this.generateNumbers()),
    );
  }
}

export default LottoGenerator;
