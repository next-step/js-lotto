import View from './view.js';
import PurchaseService from '../service/purchase.service.js';
import { PurchaseInfo } from '../common/enum.js';

export default class PurchaseView extends View {
  #lottoState;
  #purchaseService;
  #input = document.getElementById('input-purchase');
  #btnSubmit = document.getElementById('btn-purchase-submit');
  #inputMessage = document.querySelector('#form-purchase .error-message');

  constructor(lottoState) {
    super('#form-purchase');

    this.#lottoState = lottoState;
    this.#purchaseService = new PurchaseService();
    this.#setEvent();
  }

  #setEvent() {
    const events = [
      {
        event: 'input',
        handler: this.#amountChanges,
      },
      {
        event: 'keypress',
        handler: this.#triggerSubmit,
      },
      {
        event: 'click',
        handler: this.#purchase,
      },
    ];

    super.setEventHandler(events);
  }

  #amountChanges = (e) => {
    if (e.target !== this.#input) {
      return;
    }

    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  #triggerSubmit = (e) => {
    if (e.target !== this.#input) {
      return;
    }

    if ('Enter' === e.key) {
      this.#btnSubmit.click();

      e.preventDefault();
    }
  };

  #purchase = (e) => {
    const { value } = this.#input;

    if (e.target !== this.#btnSubmit) {
      return;
    }

    if (this.#validateAmount(value)) {
      return;
    }

    this.#input.value = '';
    this.#lottoState.lotto = value / PurchaseInfo.UNIT;
  };

  #validateAmount(value) {
    const errorMessage = this.#purchaseService.isValidAmount(value);

    this.#inputMessage.innerHTML = errorMessage;

    return !!errorMessage;
  }
}
