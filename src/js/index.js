import SELECTOR from './constant/selector.js';
import { handleAnswer, handleModalClose, handleModalCloseOuter } from './eventHandler/answer.js';
import { handleLottoDetailToggle, handlePayment } from './eventHandler/payment.js';
import { $ } from './util/querySelector.js';

const bindEvents = () => {
  $(SELECTOR.PAYMENT_FORM).addEventListener('submit', handlePayment);
  $(SELECTOR.TOGGLE).addEventListener('change', handleLottoDetailToggle);
  $(SELECTOR.ANSWER_FORM).addEventListener('submit', handleAnswer);
  $(SELECTOR.MODAL).addEventListener('click', handleModalCloseOuter);
  $(SELECTOR.MODAL_CLOSE).addEventListener('click', handleModalClose);
  $(SELECTOR.RESTART_BUTTON).addEventListener('click', handleModalClose);
};

bindEvents();
