import { Output } from "../view";
import { lottoMoneyRule } from "../rules";
import { Lotto, WinningLotto, LottoRank, RandomGenerator} from "./index"

export class LottoMachine {
  static LOTTO_PRICE = 1000;

  lottos = [];
  constructor() {}

  buy(money) {
    if (!lottoMoneyRule.validates(money)) return;

    const lottos = new Set();
    const theNumberOfLottos = this.countTheNumberOfLottos(money);

    while (lottos.size < theNumberOfLottos) {
      const lotto = this.generateLottoNumbers();
      lottos.add(JSON.stringify(lotto));
    }

    this.lottos = Array.from(lottos).map((lotto) => new Lotto(JSON.parse(lotto)));

    Output.printLottoInfo(this.lottos);
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
    const generator = new RandomGenerator();
    
    return generator.generateRandomNumbers();
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
};
