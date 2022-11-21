import Controller from './controller.js';

class PurchasedLottoController extends Controller {
  constructor(view, lotto) {
    super(view, lotto);
  }

  handleLottoSwitchClick() {
    this.view.showLottoNumbers = !this.view.showLottoNumbers;
  }

  addClickEvent({ target }) {
    if (this.view.$lottoSwitch.contains(target)) {
      this.handleLottoSwitchClick();
      return;
    }
  }
}

export default PurchasedLottoController;
