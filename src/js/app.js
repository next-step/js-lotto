import { LOTTO_AMOUNT_UNIT } from './constants/lotto.js';
import { Lotto } from './domain/Lotto.js';
import { LottoMachine } from './domain/LottoMachine.js';
import { WinningLotto } from './domain/WinningLotto.js';
import { LottoController } from './view/LottoController.js';
import LottoView from './view/LottoVIew.js';

export class App {
  #controller;

  constructor() {
    this.#controller = new LottoController();
  }

  run() {
    this.#controller.start();
  }
}
