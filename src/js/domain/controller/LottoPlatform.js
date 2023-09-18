import LottoMachine from "../models/LottoMachine.js";
import WinningLotto from "../models/WinningLotto/index.js";
import Statistics from "../models/Statistics.js";
import View from "../../UI/View.js";

export default class LottoPlatform {
  #view;
  #lottos = [];
  #ranks = [];

  constructor() {
    this.#view = new View();
  }

  #issueLottos(purchasingPrice) {
    // TODO v2에 purchasingPrice 받아오기
    const lottoMachine = new LottoMachine();
    this.#lottos.push(lottoMachine.issueLotto());
  }

  #displayLottos() {
    this.#lottos.forEach((targetLotto) =>
      this.#view.printLine(targetLotto.display())
    );
  }

  #checkLottoResult(winningLottoNumbers, bonusNumber) {
    const winningLotto = new WinningLotto(winningLottoNumbers, bonusNumber);
    this.#lottos.forEach((targetLotto) => {
      this.#ranks.push(winningLotto.getRank(targetLotto));
    });
  }

  #displayLottoStatistics() {
    const statistics = new Statistics();
    const rankCount = statistics.count(this.#ranks);
    const revenueRate = statistics.calculate(this.#ranks);
    this.#view.printLine(rankCount);
    this.#view.printLine(revenueRate);
  }

  async run() {
    try {
      await this.#view.addPurchasingPriceHandler((purchasingPrice) =>
        this.#issueLottos(purchasingPrice)
      );
      this.#displayLottos();
      await this.#view.addWinningInfoHandler((winningNumbers, bonusNumber) =>
        this.#checkLottoResult(winningNumbers, bonusNumber)
      );
      this.#displayLottoStatistics();
    } catch (error) {
      console.log(error.message);
    } finally {
      this.#view.close();
    }
  }
}
