import { LOTTO } from "../constants.js";
import { getLottoRandomNumber } from "../utils.js";

class Lotto {
  purchaseCount = 0;
  lottos = [];
  lottoNumberVisible = false;

  constructor() {}

  onGenerateLottosBy(count) {
    this.setPurchaseCount(count);

    const lottos = [...Array(count)].map(() => this.onGenerateLottoNumber());
    this.setLottos(lottos);
  }

  onGenerateLottoNumber() {
    const randomNumbers = new Set();
    while (randomNumbers.size !== LOTTO.MAX_SIZE) {
      const randomNumber = getLottoRandomNumber();
      randomNumbers.add(randomNumber);
    }

    return Array.from(randomNumbers);
  }

  getPurchaseCount() {
    return this.purchaseCount;
  }

  setPurchaseCount(count) {
    this.purchaseCount = count;
  }

  getLottos() {
    return this.lottos;
  }

  setLottos(lottos) {
    this.lottos = lottos;
  }

  getLottoNumberVisible() {
    return this.lottoNumberVisible;
  }

  setLottoNumberVisible(visible) {
    this.lottoNumberVisible = visible;
  }
}

export default Lotto;
