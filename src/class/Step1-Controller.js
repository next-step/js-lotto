import { ConsoleViewer } from "./Viewer.js";
import LottoGame from "./LottoGame.js";

export default class Step1Controller {
  #viewer;
  #lottoGame;

  constructor(lottoGame) {
    this.#lottoGame =
      lottoGame instanceof LottoGame ? lottoGame : new LottoGame();
    this.#viewer = new ConsoleViewer();
  }

  handleError(error) {
    this.#viewer.printContent(error);
  }

  async setPayment() {
    const payment = await this.#viewer.getPaymentInput();

    this.#lottoGame.issueLottoTickets(Number(payment));
  }

  printAmount() {
    this.#viewer.printAmount(this.#lottoGame.getLottoAmount());
  }

  printLottoNumbers() {
    this.#viewer.printLottoNumbers(this.#lottoGame.getLottoTickets());
  }

  async setWinningNumbers() {
    const winningNumbers = await this.#viewer.getWinningNumbers();

    this.#lottoGame.setWinningNumbers(winningNumbers.split(",").map(Number));
  }

  async setBonusNumber() {
    const bonusNumber = await this.#viewer.getBonusNumber();

    this.#lottoGame.setBonusNumber(Number(bonusNumber));
  }

  printPrizeSummary() {
    this.#viewer.printPrizeSummary(this.#lottoGame.getTotalPrize());
  }

  printProfitRatio() {
    this.#viewer.printProfitRatio(this.#lottoGame.getProfitRatio());
  }

  async execute() {
    try {
      await this.setPayment();

      this.printAmount();

      this.printLottoNumbers();

      await this.setWinningNumbers();

      await this.setBonusNumber();

      this.printPrizeSummary();

      this.printProfitRatio();
    } catch (e) {
      this.handleError(e);
    } finally {
      this.#viewer.closeViewer();
    }
  }
}
