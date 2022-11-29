import { ERROR_MESSAGE, LOTTO, ZERO_NUMBER } from '../../const.js';
import Controller from './controller.js';

class InputPriceFormController extends Controller {
  constructor(view, lotto) {
    super(view, lotto);
  }

  validatePrice = () => {
    if (this.model.price % LOTTO.PRICE > ZERO_NUMBER) {
      window.alert(ERROR_MESSAGE.INVALID_UNIT_NUMBER);
      return false;
    }

    if (this.model.price <= ZERO_NUMBER) {
      window.alert(ERROR_MESSAGE.INVALID_NEGATIVE_NUMBER);
      return false;
    }

    return true;
  };

  handleInputPriceButtonClick() {
    const { registerLotto } = this.model;

    if (this.validatePrice()) {
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
