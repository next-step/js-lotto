import { $, $$ } from './DOM.js';
import { ALERT_MESSAGES, LOTTO_INFORMATION } from './constants.js';
import getLottoResult from './getLottoResult.js';

const resetPurchasedLottoView = () => {
  while ($('.lotto-result-list').firstChild) {
    $('.lotto-result-list').removeChild($('.lotto-result-list').firstChild);
  }
};

const checkValidationOfPrice = () => {
  if ($('.price-input').value < LOTTO_INFORMATION.MIN_PURCHASE_PRICE) {
    alert(ALERT_MESSAGES.MIN_PURCHASE_ERROR);
    return;
  }

  if ($('.price-input').value > LOTTO_INFORMATION.MAX_PURCHASE_PRICE) {
    alert(ALERT_MESSAGES.MAX_PURCHASE_ERROR);
    return;
  }

  if (
    $('.price-input').value >= 1000 &&
    $('.price-input').value % LOTTO_INFORMATION.LOTTO_UNIT !== 0
  ) {
    alert(ALERT_MESSAGES.NOT_CORRECT_UNIT);
    return;
  }
  getLottoResult();
};

const purchaseLotto = (e) => {
  e.preventDefault(e);
  resetPurchasedLottoView();
  checkValidationOfPrice();
};

export default purchaseLotto;
