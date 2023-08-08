import LottoGameController from './step1/controller/LottoGameContoller.js';

class App {
  #lottoGameController;

  constructor() {
    this.#lottoGameController = new LottoGameController();
  }

  play() {
    this.#lottoGameController.run();
  }
}

new App().play();
