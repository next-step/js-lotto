import { $ } from './utils/dom.js';
import { SELECTOR } from './constants/index.js';
import {
  handleCLickCloseModal,
  handleClickNumberToggle,
  handleSubmitPaymentForm,
  handleClickReset,
  handleSubmitResultForm,
} from './eventHandlers/lotto.js';

const bindEvents = () => {
  $(SELECTOR.PAYMENT_FORM).addEventListener('submit', handleSubmitPaymentForm);
  $(SELECTOR.LOTTO_NUMBERS_TOGGLE_BUTTON).addEventListener('click', handleClickNumberToggle);
  $(SELECTOR.LOTTO_RESULT_FORM).addEventListener('submit', handleSubmitResultForm);
  $(SELECTOR.MODAL_CLOSE_ICON).addEventListener('click', handleCLickCloseModal);
  $(SELECTOR.RESET_BUTTON).addEventListener('click', handleClickReset);
};

bindEvents();
