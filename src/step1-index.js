import { View } from './View';
import { LottoCorporation, Store } from './Model';
import { GameController } from './Controller/GameController';
import { PRODUCTS } from './constants';

class App {
  #view;
  #lottoCorporation;
  #controller;

  constructor() {
    this.#view = new View();
    this.#lottoCorporation = new LottoCorporation(new Store(PRODUCTS));
    this.#controller = new GameController(this.#view, this.#lottoCorporation);
  }

  play() {
    this.#controller.LottoGameProcess();
  }
}

const app = new App();
app.play();
