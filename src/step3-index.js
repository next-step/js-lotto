import { ViewWeb } from './View';
import { WebController } from './Controller/WebController';

class App {
  #view;
  #controller;

  constructor() {
    this.#view = new ViewWeb();
    this.#controller = new WebController(this.#view);
  }
}

const app = new App();
