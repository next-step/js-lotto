import LottoGameController from './js/ui/LottoGameController.js';
import LottoGameViewConsole from './js/ui/LottoGameViewConsole.js';
import { withRetry } from './js/utils/withRetry.js';

class App {
  #view;
  #controller;

  constructor() {
    this.#view = new LottoGameViewConsole();
    this.#controller = new LottoGameController();
  }

  async run() {
    try {
      await this.step1();
      this.#view.printPurchasedLottos(this.#controller.purchasedLottoList);

      await this.step2();

      await this.step3();
      this.#view.printResult(this.#controller.calculateResults);

      await this.restartOrEnd();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 유저로 부터 구매 금액을 입력받아 로또를 발행한다.
   */
  async step1() {
    await withRetry(async () => {
      const purchaseAmount = await this.#view.getPurchaseAmount();
      return this.#controller.purchaseAndIssueLottos(purchaseAmount);
    });
  }

  /**
   * 유저가 입력한 로또 번호로 당첨 번호를 결정한다.
   */
  async step2() {
    await withRetry(async () => {
      const userInputNumbers = await this.#view.getLottoWinningNumbers();
      return this.#controller.setWinningNumbers(userInputNumbers);
    });
  }

  /**
   * 발행된 로또와 당첨 번호를 비교해 수익률을 계산한다.
   */
  async step3() {
    this.#controller.calculateResults();
  }

  async restartOrEnd() {
    const action = await this.#view.getRestart();

    switch (action) {
      case 'y':
        this.run();
        break;
      case 'n':
        process.exit();
      default:
        process.exit();
    }
  }
}

new App().run();
