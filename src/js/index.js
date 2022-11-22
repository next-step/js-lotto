import { isValidateAmount } from './utils/validator.js';
import { ERROR_MSSAGE } from './utils/constants.js';
import { $ } from './utils/dom.js';

import registry from './registry.js';

import lottoTemplate from './views/lottoTemplate.js';
import lottoView from './views/lotto.js';
import counterView from './views/lottoCounter.js';
import lottoNumbersView from './views/lottoNumbers.js';

// const clearLottoImages = () => {
//   while ($(SELECTOR.LOTTO_IMAGES).firstChild) {
//     $(SELECTOR.LOTTO_IMAGES).removeChild($(SELECTOR.LOTTO_IMAGES).firstChild);
//   }
// };

const onPurchaseLotto = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const purchaseAmount = formData.get('purchase-amount');

  if (!isValidateAmount(purchaseAmount)) {
    alert(ERROR_MSSAGE.AMOUNT);
    return;
  }
  // clearLottoImages();
  // setLottoElement(purchaseAmount);
};

// $(SELECTOR.PURCHASE_FORM).addEventListener('submit', onPurchaseLotto);
// $(SELECTOR.LOTTO_NUM_TOGGLE).addEventListener('change', onToggleLottoNumbers);

registry.add('lottoTemplate', lottoTemplate);
registry.add('lotto', lottoView);
registry.add('counter', counterView);
registry.add('lottoNumbers', lottoNumbersView);

const state = {
  purchaseAmount: 7000,
  toggleOn: true,
};

window.requestAnimationFrame(() => {
  const newApp = registry.renderRoot($('#app'), state);
  $('#app').replaceWith(newApp);
});
