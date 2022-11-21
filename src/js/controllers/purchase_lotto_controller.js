import Controller from './controller.js';

class PurchasedLottoController extends Controller {
  constructor(view, lotto) {
    super(view, lotto);
  }

  handleInputPriceButtonClick() {
    this.view.lottos = this.model.lottos;
    this.view.lottoCount = this.model.lottoCount;
  }

  handleLottoSwitchClick() {
    this.view.showLottoNumbers = !this.view.showLottoNumbers;
  }

  addClickEvent({ target }) {
    if (this.view.$lottoSwitch.contains(target)) {
      this.handleLottoSwitchClick();
      return;
    }

    if (this.view.$inputPriceButton.contains(target)) {
      this.handleInputPriceButtonClick();
    }
  }
}

export default PurchasedLottoController;
