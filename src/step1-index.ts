import LottoGameController from '@step1/controller/LottoGameController';

class App {
  #lottoGameController: LottoGameController;

  constructor() {
    this.#lottoGameController = new LottoGameController();
  }

  play() {
    this.#lottoGameController.run();
  }
}

new App().play();
