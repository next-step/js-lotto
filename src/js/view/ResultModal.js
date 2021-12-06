import { DOM_ID } from '../constants.js';
import { $, $$ } from '../utils.js';

export default class ResultModal {
  constructor() {
    this.$resultModal = $(DOM_ID.RESULT_MODAL);
    this.$resultCountList = $$(DOM_ID.RESULT_COUNT_LIST);
    this.$profitMessage = $(DOM_ID.PROFIT_MESSAGE);
    this.$retryButton = $(DOM_ID.RETRY_BUTTON);
    this.$cancelButton = $(DOM_ID.CANCEL_BUTTON);
  }

  openModal() {
    this.$resultModal.classList.add('open');
  }

  closeModal() {
    this.$resultModal.classList.remove('open');
  }

  bindOnClickBlackout(handler) {
    document.addEventListener('click', (event) => {
      handler(event, this.$resultModal);
    });
  }

  bindOnClickRetryButton(handler) {
    this.$retryButton.addEventListener('click', () => {
      handler();
    });
  }

  bindOnClickCancelButton(handler) {
    this.$cancelButton.addEventListener('click', () => {
      handler();
    });
  }

  updateModal(result) {
    Object.values(result).reverse().forEach((count, index) => {
      this.$resultCountList[index].innerText = `${count}개`;
    });
  }
}
