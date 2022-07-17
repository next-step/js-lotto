import { Controller } from "./Controller.js";

export class LottoController extends Controller {
  constructor(view, model) {
    super(view, model);
    this.addEventHandlers();
    this.render();
  }

  purchase(e) {
    try {
      e.preventDefault();
      const charge = Number(new FormData(e.target).get("charge"));
      this.model.purchase(charge);
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
