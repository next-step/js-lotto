import '@src/css/index.css';
import LottoApplicationController from '@step3/controller/LottoApplicationController';

class WebApp {
  private controller: LottoApplicationController;

  constructor() {
    this.controller = new LottoApplicationController();
  }

  play() {
    this.controller.run();
  }
}

new WebApp().play();
