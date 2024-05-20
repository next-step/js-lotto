import View from "../view/view";
import { Lotto, WinningLotto } from "./Lotto";
import { LOTTO_LENGTH, MAXIMUM_LOTTO_NUMBER } from "../constants";
import { LottoRank } from "./LottoRank";

class LottoMachine {
  static LOTTO_PRICE = 1000;

  lottos = [];
  constructor() {}

  buy(money) {
    const lottos = new Set();
    const theNumberOfLottos = this.countTheNumberOfLottos(money);

    while (lottos.size < theNumberOfLottos) {
      const lotto = this.generateLottoNumbers();
      lottos.add(JSON.stringify(lotto));
    }

    this.lottos = Array.from(lottos).map((lotto) => new Lotto(JSON.parse(lotto)));

    View.printLottoInfo(this.lottos);
    return this.lottos;
  }

  /**
   * @param {WinningLotto} winningLotto
   * @returns {Map}
   */
  getLottoRanks(winningLotto) {
    const lottoRanks = this.lottos.map((lotto) => winningLotto.getRank(lotto));
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

  countTheNumberOfLottos(money) {
    return money / LottoMachine.LOTTO_PRICE;
  }

  generateLottoNumbers() {
    const lottos = new Set();

    while (lottos.size < LOTTO_LENGTH) {
      const randomNumber = this.generateRandomNumbers();
      lottos.add(randomNumber);
    }
    return Array.from(lottos).sort((a, b) => a - b);
  }

  generateRandomNumbers() {
    return Math.floor(Math.random() * MAXIMUM_LOTTO_NUMBER) + 1;
  }

  /**
   * @param {Lotto} winningNumbers
   * @param {number} bonusNumber
   */
  generateWinningLotto(winningNumbers, bonusNumber) {
    return new WinningLotto(winningNumbers, bonusNumber);
  }

  /**
   * @param {Map} lottoRankCounts
   */
  calculateLottoResult(lottoRankCounts) {
    const lottoResult = LottoRank.getLottoResult(lottoRankCounts);
    const lottoReturn = LottoRank.calculateLottoReturn(lottoRankCounts);

    return { lottoResult, lottoReturn };
  }
}

export default LottoMachine;
