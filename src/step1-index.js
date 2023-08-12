import { GameController } from './Controller/GameController';

class App {
  #controller;

  constructor(controller) {
    this.#controller = controller;
  }

  play() {
    this.#controller.play();
  }
}

const app = new App(new GameController());
app.play();
