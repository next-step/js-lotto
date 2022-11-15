import { ErrorPurchase } from '../common/enum.js';

export default class InputPurchase {
  purchaseMin;
  purchaseMax;
  selector;

  constructor() {
    this.purchaseMin = 1000;
    this.purchaseMax = 100000;
    this.selector = {
      inputPurchase: document.getElementById('input-purchase'),
      errorMessage: document.querySelector('.message-purchase-error'),
    };

    this.setEventListener();
  }

  setEventListener() {
    const submit = document.getElementById('btn-purchase-submit');

    submit.addEventListener('click', this.validateAmount);
    this.selector.inputPurchase.addEventListener('input', this.amountChanges);
    this.selector.inputPurchase.addEventListener('keypress', (e) => {
      if ('Enter' === e.key) {
        submit.click();
        e.preventDefault();
      }
    });
  }

  amountChanges = () => {
    this.selector.inputPurchase.value = this.selector.inputPurchase.value.replace(/[^0-9]/g, '');

    this.setErrorMessage();
  };

  validateAmount = () => {
    const value = Number(this.selector.inputPurchase.value);

    switch (true) {
      case !value:
        this.setErrorMessage(ErrorPurchase.NO_VALUE);
        break;

      case this.purchaseMin > value || this.purchaseMax < value:
        this.setErrorMessage(`${this.purchaseMin} ~ ${this.purchaseMax} ${ErrorPurchase.OUT_OF_RANGE}`);
        break;

      case value % 1000 !== 0:
        this.setErrorMessage(`${this.purchaseMin} ${ErrorPurchase.WRONG_UNIT}`);
        break;

      default:
        this.selector.inputPurchase.value = '';
        this.setErrorMessage();
    }
  };

  setErrorMessage(message = '') {
    this.selector.errorMessage.innerHTML = message;
  }
}
