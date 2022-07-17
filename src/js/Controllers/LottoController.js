import { Controller } from "./Controller.js";

export class LottoController extends Controller {
  constructor(view, model) {
    super(view, model);
    this.addEventHandlers();
    this.view.render(this.model.state);
  }

  purchase(e) {
    try {
      this.model.purchase(e);
      this.render();
    } catch (e) {
      if (e instanceof TypeError) throw e;
      window.alert(e.message);
      this.view.$chargeInput.focus();
    }
  }

  toggleLottoNumbers() {
    this.model.toggleLottoNumbers();
    this.render();
  }

  addEventHandlers() {
    this.view.$charge.addEventListener("submit", this.purchase.bind(this));
    this.view.$visibilityToggle.addEventListener("change", this.toggleLottoNumbers.bind(this));
  }
}
