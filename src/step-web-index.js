import LottoController from "./web/LottoController.js";
class App {

  #lottoController;
  #renderPage;

  init() {
    this.#initInputMoney();
    this.#initContrimPrize();
    this.#initRestart();
    this.#initClose();
    this.#lottoController = new LottoController();
  }

  #initInputMoney() {
    document.getElementById("buyButton").addEventListener('click', () => {
      this.#lottoController.inputMoney(this.#getMoney());
    });
  }

  #initContrimPrize() {
    document.getElementById("confirmButton").addEventListener('click', () => {
      this.#lottoController.confirmPrize(this.#getPrizeNumber(), this.#getBonusNum());
    });
  }

  #initRestart() {
    document.getElementById("restartButton").addEventListener('click', () => {
      this.#lottoController.restart();
    });
  }

  #initClose() {
    document.getElementById("closeButton").addEventListener('click', () => {
      this.#lottoController.close();
    });
  }

  #getMoney() {
    return document.getElementById('money').value;
  }

  #getPrizeNumber() {
    return Array.from(document.querySelectorAll(".winning-numbers-container input[type='number']")).map(num => Number(num.value));
  }

  #getBonusNum() {
    return document.getElementById('bonusNumber').value;
  }

}

const app = new App();
app.init();