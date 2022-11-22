import { LOTTO } from "./constants.js";
import LottoView from "./LottoView.js";
import { getLottoRandomNumber } from "./utils.js";

class Lotto {
  #lottoView;

  constructor() {
    this.#lottoView = new LottoView();
  }

  makeLottos(count) {
    const lottos = this.onGenerateLottosBy(count);
    this.#lottoView.render(lottos);
  }

  onGenerateLottosBy(count) {
    return [...Array(count)].map(() => this.getLottoNumber());
  }

  getLottoNumber() {
    const randomNumbers = new Set();
    while (randomNumbers.size !== LOTTO.MAX_SIZE) {
      const randomNumber = getLottoRandomNumber();
      randomNumbers.add(randomNumber);
    }

    return Array.from(randomNumbers);
  }
}

export default Lotto;
