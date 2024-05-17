import { LOTTO_LENGTH, LOTTO_PRICE, MAXIMUM_LOTTO_NUMBER } from "../constants";
import { Lotto, WinningLotto } from "./Lotto";
import View from "./View";

class LottoMachine {
  lottos = [];
  constructor() {}

  buy(money) {
    const theNumberOfLottos = this.getTheNumberOfLottos(money);
    this.lottos = Array.from({ length: theNumberOfLottos }, () => this.generateLotto());

    View.printLottoInfo(this.lottos);
    return this.lottos;
  }

  /**
   * @param {WinningLotto} winningLotto 
   * @returns {Map}
   */
  getLottoRanks(winningLotto) {
    const lottoRanks = this.lottos.map((lotto) => lotto.getRank(winningLotto));
    const lottoRankCounts = this.countLottoRanks(lottoRanks);
    return lottoRankCounts;
  }

  /**
   * @param {string[]} lottoRanks 
   * @returns {Map}
   */
  countLottoRanks(lottoRanks) {
    return lottoRanks.reduce((acc, rank) => {
      acc.set(rank, acc.get(rank) + 1 || 1);
      return acc;
    }, new Map());
  }

  getTheNumberOfLottos(money) {
    return money / LOTTO_PRICE;
  }

  generateLotto() {
    const lottos = new Set();

    while (lottos.size < LOTTO_LENGTH) {
      const randomNumber = this.generateRandomNumbers();
      lottos.add(randomNumber);
    }
    return new Lotto(Array.from(lottos));
  }

  generateRandomNumbers() {
    return Math.floor(Math.random() * MAXIMUM_LOTTO_NUMBER) + 1;
  }
}

export default LottoMachine;
