import View from './view.js';
import PurchaseService from '../service/purchase.service.js';
import { PurchaseInfo } from '../common/enum.js';

export default class PurchaseView extends View {
  #lottoState;
  #purchaseService;
  #input = this.element.querySelector('#input-purchase');
  #btnSubmit = this.element.querySelector('#btn-purchase-submit');
  #inputMessage = this.element.querySelector('.error-message');

  constructor(lottoState) {
    super('#form-purchase');

    this.#lottoState = lottoState;
    this.#purchaseService = new PurchaseService();
    this.#setEvent();
  }

  #setEvent() {
    this.events = [
      {
        target: this.#input,
        event: 'input',
        handler: this.#numbersOnly,
      },
      {
        target: this.#input,
        event: 'keypress',
        handler: this.#triggerSubmit,
      },
      {
        target: this.#btnSubmit,
        event: 'click',
        handler: this.#purchase,
      },
    ];

    super.setEventHandler();
  }

  #numbersOnly = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  #triggerSubmit = (e) => {
    if ('Enter' === e.key) {
      this.#btnSubmit.click();

      e.preventDefault();
    }
  };

  #purchase = () => {
    const { value } = this.#input;

    if (this.#validateAmount(value)) {
      return;
    }

    this.#input.value = '';
    this.#lottoState.list = this.#purchaseService.getLotto(value / PurchaseInfo.UNIT);
  };

  #validateAmount(value) {
    const errorMessage = this.#purchaseService.isValidAmount(value);

    this.#inputMessage.innerHTML = errorMessage;

    return !!errorMessage;
  }
}
