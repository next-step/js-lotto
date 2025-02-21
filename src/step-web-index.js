import LottoController from "./web/LottoController.js";
class App {
  #lottoController;

  constructor() {
    this.#lottoController = new LottoController();
  }

  play() {
    this.#lottoController.init();
  }
}

const app = new App();
app.play();