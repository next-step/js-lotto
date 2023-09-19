import { ViewWeb } from './View';
import { WebController } from './Controller/WebController';
import './css/index.css';

class App {
  #view;
  #controller;

  constructor() {
    this.#view = new ViewWeb();
    this.#controller = new WebController(this.#view);
  }
}

const app = new App();
