import { Output } from "../view";
import { lottoMoneyRule } from "../rules";
import { Lotto, WinningLotto, RandomGenerator, LottoRank } from "./index";
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

  countTheNumberOfLottos(money) {
    return money / LottoMachine.LOTTO_PRICE;
  }

  generateLottoNumbers() {
    const generator = new RandomGenerator();

    return generator.generateRandomNumbers();
  }

  getLottoResult(winningLotto) {
    const lottoRank = new LottoRank(this.lottos, winningLotto);
    const lottoResult = lottoRank.getLottoResult();

    return lottoResult;
  }

  /**
   * @param {Lotto} winningNumbers
   * @param {number} bonusNumber
   */
  generateWinningLotto(winningNumbers, bonusNumber) {
    return new WinningLotto(winningNumbers, bonusNumber);
  }
}
