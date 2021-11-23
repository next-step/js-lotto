import View from "./view.js";
import {$, $$} from "../utils.js";
import {DOM_ID} from "../constants.js";

export default class ResultModal extends View {
  constructor() {
    super();
    this.$resultModal = $(DOM_ID.RESULT_MODAL);
    this.$resultCountList = $$(DOM_ID.RESULT_COUNT_LIST);
    this.$profitMessage = $(DOM_ID.PROFIT_MESSAGE);
    this.$retryButton = $(DOM_ID.RETRY_BUTTON);
    this.$cancelButton = $(DOM_ID.CANCEL_BUTTON);
  }

  show() {
    this.$resultModal.classList.add('open');
  }

  hide() {
    this.$resultModal.classList.remove('open');
  }

  bindOnClickBlackout(handler) {
    addEventListener('click', (event) => {
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



};