import { LottoController } from './view-step3/LottoController';

export class App {
  #controller;

  constructor() {
    this.#controller = new LottoController();
  }

  run() {
    this.#controller.start();
  }
}
