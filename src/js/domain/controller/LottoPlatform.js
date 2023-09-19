import createLottoMachine from "../models/LottoMachine/createLottoMachine.js";
import Lotto from "../models/Lotto/index.js";
import WinningLotto from "../models/WinningLotto/index.js";
import createStatistics from "../models/createStatistics.js";
import View from "../../UI/View.js";
import { RetryError } from "./errors.js";

export default class LottoPlatform {
  #view;
  #lottoWithWinningNumbers;
  #lottos = [];
  #ranks = [];

  constructor() {
    this.#view = new View();
  }

  #issueLottos(purchasingPrice) {
    const { issueLottoOf } = createLottoMachine();
    this.#lottos = issueLottoOf(purchasingPrice);
    this.#view.printLine(`${this.#lottos.length}개를 구매했습니다.`);
  }

  #displayLottos() {
    this.#lottos.forEach((targetLotto) =>
      this.#view.printLine(targetLotto.display())
    );
    this.#view.printLine("");
  }

  #validateWinningNumbers(winningNumbers) {
    this.#lottoWithWinningNumbers = Lotto.of(winningNumbers);
  }

  #checkLottoResult(bonusNumber) {
    const winningLotto = new WinningLotto(
      this.#lottoWithWinningNumbers,
      bonusNumber
    );
    this.#lottos.forEach((targetLotto) => {
      this.#ranks.push(winningLotto.getRank(targetLotto));
    });
  }

  #displayLottoStatistics() {
    const { countRanks, calculateRevenue } = createStatistics();
    const rankCount = countRanks(this.#ranks);
    const revenueRate = calculateRevenue(this.#ranks);
    this.#view.printStatistics(rankCount, revenueRate);
  }

  async runOnce() {
    try {
      await this.#view.addPurchasingPriceHandler((purchasingPrice) =>
        this.#issueLottos(purchasingPrice)
      );
      this.#displayLottos();

      await this.#view.addWinningNumberHandler((winningNumbers) =>
        this.#validateWinningNumbers(winningNumbers)
      );

      await this.#view.addBonusNumberHandler((bonusNumber) =>
        this.#checkLottoResult(bonusNumber)
      );
      this.#displayLottoStatistics();
    } catch (error) {
      this.#view.printLine(error.message);
    } finally {
      this.#view.close();
    }
  }

  async runUntilFinish() {
    let goToFlag = 1;

    while (goToFlag !== 5) {
      try {
        while (goToFlag === 1) {
          await this.#view.addPurchasingPriceHandler((purchasingPrice) =>
            this.#issueLottos(purchasingPrice)
          );
          this.#displayLottos();
          goToFlag = 2;
        }

        while (goToFlag === 2) {
          await this.#view.addWinningNumberHandler((winningNumbers) =>
            this.#validateWinningNumbers(winningNumbers)
          );
          goToFlag = 3;
        }

        while (goToFlag === 3) {
          await this.#view.addBonusNumberHandler((bonusNumber) =>
            this.#checkLottoResult(bonusNumber)
          );
          this.#displayLottoStatistics();
          goToFlag = 4;
        }

        while (goToFlag === 4) {
          await this.#view.addRetryHandler((retry) => {
            switch (retry) {
              case "y":
                goToFlag = 1;
                break;
              case "n":
                goToFlag = 5;
                break;
              default:
                throw new RetryError();
            }
          });
        }
      } catch (error) {
        this.#view.printLine(error.message);
      }
    }

    this.#view.close();
  }
}
