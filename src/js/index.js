import SELECTOR from './constant/selector.js';
import {
  handleLottoAnswer,
  handleModalClose,
  handleModalCloseOuter,
} from './eventHandler/answer.js';
import { handleIssueRestLotto, handleManualLottoIssue } from './eventHandler/issue.js';
import { handleLottoDetailToggle, handleLottoPayment } from './eventHandler/payment.js';
import { $ } from './util/querySelector.js';

const bindEvents = () => {
  $(SELECTOR.PAYMENT_FORM).addEventListener('submit', handleLottoPayment);
  $(SELECTOR.TOGGLE).addEventListener('change', handleLottoDetailToggle);
  $(SELECTOR.ANSWER_FORM).addEventListener('submit', handleLottoAnswer);
  $(SELECTOR.MODAL).addEventListener('click', handleModalCloseOuter);
  $(SELECTOR.MODAL_CLOSE).addEventListener('click', handleModalClose);
  $(SELECTOR.RESTART_BUTTON).addEventListener('click', handleModalClose);
  $(SELECTOR.MANUAL_NUMBERING_FORM).addEventListener('submit', handleManualLottoIssue);
  $(SELECTOR.MANUAL_NUMBERING_CANCEL).addEventListener('click', handleIssueRestLotto);
};

bindEvents();
