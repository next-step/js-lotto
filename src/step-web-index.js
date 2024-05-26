import LottoController from "./js/LottoController";
import "./js/ModalController";
class App {
  #lottoController;
  #lottoGame;

  constructor() {
    this.#lottoController = new LottoController();
  }

  play() {
    this.#lottoController.init();
  }
}

const app = new App();
app.play();
