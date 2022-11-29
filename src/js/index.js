import { isValidateAmount } from './utils/validator.js';
import { ERROR_MSSAGE } from './utils/constants.js';
import { $ } from './utils/dom.js';

import registry from './registry.js';
import applyDiff from './applyDiff.js';

import lottoTemplate from './views/lottoTemplate.js';
import lottoView from './views/lotto.js';
import counterView from './views/lottoCounter.js';
import lottoNumbersView from './views/lottoNumbers.js';
// import modalView from './view/modal.js';

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

const getPurchaseAmount = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  return randomNumber * 1000;
};

registry.add('lottoTemplate', lottoTemplate);
registry.add('lotto', lottoView);
registry.add('counter', counterView);
registry.add('lottoNumbers', lottoNumbersView);

const state = {
  purchaseAmount: 7000,
  toggleOn: true,
  modalOn: true,
};

const render = () => {
  window.requestAnimationFrame(() => {
    const newApp = registry.renderRoot($('#app'), state);
    applyDiff(document.body, $('#app'), newApp);
  });
};

window.setInterval(() => {
  state.purchaseAmount = getPurchaseAmount();
  render();
}, 5000);
render();
