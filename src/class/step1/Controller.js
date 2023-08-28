import { ConsoleViewer } from "./Viewer.js";
import LottoGame from "../LottoGame.js";
import { UserInputError } from "../Error.js";

export default class Controller {
  #viewer;
  #lottoGame;

  constructor(lottoGame = new LottoGame()) {
    if (!(lottoGame instanceof LottoGame)) {
      throw new Error("올바른 로또 게임이 아닙니다.");
    }

    this.#lottoGame = lottoGame;
    this.#viewer = new ConsoleViewer();
  }

  async handleError(error) {
    if (error instanceof UserInputError) {
      this.#viewer.printContent(error.message);

      await this.execute();

      return;
    }

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

  async retryGame() {
    const retryAnswer = await this.#viewer.getRetryAnswer();

    if (retryAnswer.toUpperCase() === "Y") {
      await this.execute();
    } else {
      this.#viewer.closeViewer();
    }
  }

  async execute() {
    try {
      if (this.#lottoGame.stage === "SET_PAYMENT") {
        await this.setPayment();

        this.printAmount();

        this.printLottoNumbers();

        this.#lottoGame.stage = "SET_WINNING_NUMBERS";
      }

      if (this.#lottoGame.stage === "SET_WINNING_NUMBERS") {
        await this.setWinningNumbers();

        this.#lottoGame.stage = "SET_BONUS_NUMBER";
      }

      if (this.#lottoGame.stage === "SET_BONUS_NUMBER") {
        await this.setBonusNumber();

        this.#lottoGame.stage = "SET_PAYMENT";
      }

      this.printPrizeSummary();

      this.printProfitRatio();

      await this.retryGame();
    } catch (e) {
      await this.handleError(e);
    }
  }
}
