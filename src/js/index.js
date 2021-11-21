import SELECTOR from './constant/selector.js';
import { handleLottoDetailToggle, handlePayment } from './eventHandler/lotto.js';
import { $ } from './util/querySelector.js';

const bindEvents = () => {
  $(SELECTOR.PAYMENT_FORM).addEventListener('submit', handlePayment);
  $(SELECTOR.TOGGLE).addEventListener('change', handleLottoDetailToggle);
};

bindEvents();
