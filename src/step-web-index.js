import LottoController from "./web/LottoController.js";
import RenderPage from "./web/RenderPage.js";
class App {

  #lottoController;
  #renderPage;

  init() {
    this.#initInputMoney();
    this.#initContrimPrize();
    this.#initRestart();
    this.#initClose();
    this.#lottoController = new LottoController();
    this.#renderPage = new RenderPage();
  }

  #initInputMoney() {
    document.getElementById("buyButton").addEventListener('click', () => {
      this.#renderPage.clearInput();
      const lottoMachine = this.#lottoController.inputMoney(this.#getMoney());
      console.log(lottoMachine)
      this.#renderPage.renderLottoList(lottoMachine);
    });
  }

  #initContrimPrize() {
    document.getElementById("confirmButton").addEventListener('click', () => {
      const lottoConfirmation = this.#lottoController.confirmPrize(this.#getPrizeNum(), this.#getBonusNum());
      this.#renderPage.openModal(lottoConfirmation);
    });
  }

  #initRestart() {
    document.getElementById("restartButton").addEventListener('click', () => {
      this.#renderPage.closeModal();
      this.#renderPage.clearInput();
    });
  }

  #initClose() {
    document.getElementById("closeButton").addEventListener('click', () => {
      this.#renderPage.closeModal();
    });
  }

  #getMoney() {
    return document.getElementById('money').value;
  }

  #getPrizeNum() {
    return Array.from(document.querySelectorAll(".winning-numbers-container input[type='number']")).map(num => Number(num.value));
  }

  #getBonusNum() {
    return document.getElementById('bonusNum').value;
  }

}

const app = new App();
app.init();