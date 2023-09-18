import LottoMachine from "../models/LottoMachine/index.js";
import WinningLotto from "../models/WinningLotto/index.js";
import Statistics from "../models/Statistics.js";
import RuntimeError from "../RuntimeError.js";
import View from "../../UI/View.js";

export default class LottoPlatform {
  #view;
  #lottos = [];
  #ranks = [];

  constructor() {
    this.#view = new View();
  }

  #issueLottos(purchasingPrice) {
    const lottoMachine = new LottoMachine();
    this.#lottos = lottoMachine.issueLottoOf(purchasingPrice);
    this.#view.printLine(`${this.#lottos.length}개를 구매했습니다.`);
  }

  #displayLottos() {
    this.#lottos.forEach((targetLotto) =>
      this.#view.printLine(targetLotto.display())
    );
    this.#view.printLine("");
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
    this.#view.printStatistics(rankCount, revenueRate);
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
      let message = error.message;
      if (error instanceof RuntimeError) {
        message = error.getMessage();
      }

      this.#view.printLine(message);
    } finally {
      this.#view.close();
    }
  }
}
