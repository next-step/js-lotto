import { Controller } from "./Controller.js";

export class AwardController extends Controller {
  constructor(view, model, properties) {
    super(view, model, properties);
    this.addEventHandlers();
    this.render();
  }

  drawLotto(e) {
    e.preventDefault();
    const lottos = this.properties.getLottos();
    this.model.showAward();
    this.render();
  }

  resetApp() {
    this.properties.resetApp();
  }

  closeModal() {
    this.model.closeAward();
    this.render();
  }

  addEventHandlers() {
    this.view.$winningNumberForm.addEventListener("submit", this.drawLotto.bind(this));
    this.view.$awardModalCloseButton.addEventListener("click", this.closeModal.bind(this));
    // this.view.$resetButton.addEventListener("click", this.resetApp.bind(this));
  }
}
