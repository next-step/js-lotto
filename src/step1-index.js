import { View } from './View';
import { GameController } from './Controller/GameController';

class App {
  #view;
  #controller;

  constructor() {
    this.#view = new View();
    this.#controller = new GameController(this.#view);
  }

  play() {
    this.#controller.configStore();
  }
}

const app = new App();
app.play();
