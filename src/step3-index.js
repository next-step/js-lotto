import { ViewWeb } from './View/Web';
import { WebController } from './Controller/WebController';
import './css/index.css';

console.log('step3!');

class App {
  #view;
  #controller;

  constructor() {
    this.#view = new ViewWeb();
    this.#controller = new WebController(this.#view);
  }
}

const app = new App();
