import LottoController from "./js/LottoController";

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
