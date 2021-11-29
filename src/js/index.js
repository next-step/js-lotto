import SELECTOR from './constant/selector.js';
import {
  handleLottoDetailToggle,
  handlePayment,
  handleAnswer,
  handleModalClose,
  handleModalCloseOuter,
} from './eventHandler/lotto.js';
import { $ } from './util/querySelector.js';

const bindEvents = () => {
  $(SELECTOR.PAYMENT_FORM).addEventListener('submit', handlePayment);
  $(SELECTOR.TOGGLE).addEventListener('change', handleLottoDetailToggle);
  $(SELECTOR.ANSWER_FORM).addEventListener('submit', handleAnswer);
  $('.modal').addEventListener('click', handleModalCloseOuter);
  $('.js-modal-close').addEventListener('click', handleModalClose);
  $('.js-restart-button').addEventListener('click', handleModalClose);
};

bindEvents();
