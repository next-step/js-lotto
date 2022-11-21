import { isValidateAmount } from './utils/validator.js';
// import { getTicketCount, getLottoNumbers } from './lotto.js';
import { ERROR_MSSAGE, SELECTOR } from './utils/constants.js';
import { $, $all } from './utils/dom.js';

import appView from './views/app.js';

// const clearLottoImages = () => {
//   while ($(SELECTOR.LOTTO_IMAGES).firstChild) {
//     $(SELECTOR.LOTTO_IMAGES).removeChild($(SELECTOR.LOTTO_IMAGES).firstChild);
//   }
// };

const onPurchaseLotto = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const purchaseAmount = formData.get("purchase-amount");

  if (!isValidateAmount(purchaseAmount)) {
    alert(ERROR_MSSAGE.AMOUNT);
    return;
  }
  // clearLottoImages();
  // setLottoElement(purchaseAmount);
};

const showLottoNumbers = () => {
  $(SELECTOR.LOTTO_IMAGES).classList.add('d-block');
  $(SELECTOR.LOTTO_IMAGES).classList.remove('d-flex');
  $all(SELECTOR.LOTTO_NUMS).forEach((lotto) => {
    lotto.style.display = 'inline-block';
  });
};

// $(SELECTOR.PURCHASE_FORM).addEventListener('submit', onPurchaseLotto);
// $(SELECTOR.LOTTO_NUM_TOGGLE).addEventListener('change', onToggleLottoNumbers);

const state = {
  purchaseAmount: 7000,
  toggleOn: true,
}

window.requestAnimationFrame(() => {
  const newApp = appView($('#app'), state);
  $('#app').replaceWith(newApp);
});