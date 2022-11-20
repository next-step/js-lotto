import { $ } from '../../utils.js';
import Controller from '../controller.js';

class InputPriceForm extends Controller {
  constructor($target, lotto) {
    super($target, lotto);
    this.$inputPrice = $('#input-price');
    this.$inputPriceButton = $('#input-price-btn');
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

  addClickEvent(event) {
    const { target } = event;

    if (this.$inputPriceButton.contains(target)) {
      event.preventDefault();
      this.handleInputPriceButtonClick();
      return;
    }
  }

  addChangeEvent({ target }) {
    if (this.$inputPrice.contains(target)) {
      this.handleInputPriceChange(target.value);
      return;
    }
  }
}

export default InputPriceForm;
