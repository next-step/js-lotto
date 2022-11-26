import Controller from './controller.js';

class InputPriceFormController extends Controller {
  constructor(view, lotto) {
    super(view, lotto);
  }

  handleInputPriceButtonClick() {
    const { validatePrice, registerLotto } = this.model;

    if (validatePrice()) {
      registerLotto();
    }
  }

  handleInputPriceChange(nextPrice) {
    const { setPrice } = this.model;

    setPrice(Number(nextPrice));
  }

  addSubmitEvent(event) {
    const { target } = event;

    if (this.view.$inputPriceForm.contains(target)) {
      event.preventDefault();
      this.handleInputPriceButtonClick();
      return;
    }
  }

  addChangeEvent({ target }) {
    if (this.view.$inputPrice.contains(target)) {
      this.handleInputPriceChange(target.value);
      return;
    }
  }
}

export default InputPriceFormController;
