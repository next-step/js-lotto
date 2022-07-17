import { $ } from './DOM.js';
import { ALERT_MESSAGES, LOTTO_INFORMATION } from './constants.js';
import displayLottoView from './displayLottoView.js';

const resetPurchasedLottoView = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const alertPurchaseErrorMessage = (message) => {
  alert(message);
};

const isCheckValidationOfPrice = (type, range) => {
  const price = $('.price-input').value;

  if (type === 'range' && range === 'min') {
    return price < LOTTO_INFORMATION.MIN_PURCHASE_PRICE;
  }
  if (type === 'range' && range === 'max') {
    return price > LOTTO_INFORMATION.MAX_PURCHASE_PRICE;
  }
  if (type === 'unit' && range === undefined) {
    return price % LOTTO_INFORMATION.PRICE_UNIT !== 0;
  }
};

const checkPurchaseLotto = () => {
  if (isCheckValidationOfPrice('range', 'min')) {
    alertPurchaseErrorMessage(ALERT_MESSAGES.MIN_PURCHASE_ERROR);
    return;
  }

  if (isCheckValidationOfPrice('range', 'max')) {
    alertPurchaseErrorMessage(ALERT_MESSAGES.MAX_PURCHASE_ERROR);
    return;
  }

  if (isCheckValidationOfPrice('unit')) {
    alertPurchaseErrorMessage(ALERT_MESSAGES.NOT_CORRECT_UNIT);
    return;
  }
  displayLottoView();
};

const purchaseLotto = (e) => {
  e.preventDefault(e);
  resetPurchasedLottoView($('.lotto-result-list'));
  checkPurchaseLotto();
};

export default purchaseLotto;
