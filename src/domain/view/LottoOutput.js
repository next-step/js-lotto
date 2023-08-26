import { CLASS, EVENT as E, EMPTY_STRING, SELECTOR, STATE } from '../constants/index.js';

import { LottoTicket } from './components/LottoTicket.js';
import { ResultModal } from './components/ResultModal.js';

export class LottoOutput {
  constructor({ app }) {
    this.budgetForm = app.querySelector(SELECTOR.BUDGET_FORM);
    this.budgetInput = app.querySelector(SELECTOR.BUDGET_INPUT);
    this.budgetButton = app.querySelector(SELECTOR.BUDGET_BUTTON);
    this.budgetError = app.querySelector(SELECTOR.BUDGET_ERROR);
    this.lottoCount = app.querySelector(SELECTOR.LOTTO_COUNT);
    this.lottoList = app.querySelector(SELECTOR.LOTTO_LIST);
    this.lottoToggle = app.querySelector(SELECTOR.LOTTO_TOGGLE);
    this.lottoToggleWrapper = app.querySelector(SELECTOR.LOTTO_TOGGLE_WRAPPER);
    this.lottoSection = app.querySelector(SELECTOR.LOTTO_SECTION);
    this.winningForm = app.querySelector(SELECTOR.WINNING_FORM);
    this.winningButton = app.querySelector(SELECTOR.WINNING_BUTTON);
    this.winningError = app.querySelector(SELECTOR.WINNING_ERROR);
    this.modal = app.querySelector(SELECTOR.MODAL);
    this.modalBody = app.querySelector(SELECTOR.MODAL_BODY);
    this.modalCloseButton = app.querySelector(SELECTOR.MODAL_CLOSE);
    this.retryButton = app.querySelector(SELECTOR.RETRY_BUTTON);
    this.render();
  }

  render() {
    this.winningForm.querySelectorAll(E.INPUT).forEach((input) => (input.value = EMPTY_STRING));
    this.winningForm.classList.add(CLASS.HIDDEN);
    this.lottoToggleWrapper.classList.add(CLASS.HIDDEN);
    this.lottoSection.classList.add(CLASS.HIDDEN);
    this.lottoList.classList.remove(CLASS.FLEX_COL);
    this.lottoToggle.checked = STATE.FALSE;
    this.budgetInput.disabled = STATE.FALSE;
    this.budgetButton.disabled = STATE.TRUE;
    this.lottoList.innerHTML = EMPTY_STRING;
    this.winningButton.disabled = STATE.TRUE;
    this.budgetInput.value = EMPTY_STRING;
  }

  showErrorMessage(elementId, message) {
    const errorElement = elementId === 'budget-input' ? this.budgetError : this.winningError;
    errorElement.innerHTML = message;
    errorElement.classList.toggle(CLASS.HIDDEN, message === EMPTY_STRING);
    if (elementId === 'budget-input') {
      this.budgetButton.disabled = message === EMPTY_STRING ? STATE.FALSE : STATE.TRUE;
    } else {
      this.winningButton.disabled = message === EMPTY_STRING ? STATE.FALSE : STATE.TRUE;
    }
  }

  showLottos(lottos) {
    this.budgetButton.disabled = STATE.TRUE;
    this.budgetInput.disabled = STATE.TRUE;
    this.lottoCount.textContent = `총 ${lottos.length}개를 구매했습니다.`;
    this.lottoToggleWrapper.classList.remove(CLASS.HIDDEN);
    lottos.forEach((lotto) => (this.lottoList.innerHTML += LottoTicket(lotto)));
    this.lottoSection.classList.remove(CLASS.HIDDEN);
    this.lottoIcons = document.querySelectorAll('.lotto-ticket span');
    this.winningForm.classList.remove(CLASS.HIDDEN);
  }

  toggleLotto(isChecked) {
    this.lottoList.classList.toggle(CLASS.FLEX_COL, isChecked);
    this.lottoIcons.forEach((child) => child.classList.toggle(CLASS.HIDDEN, !isChecked));
  }

  showResultModal(result, profitRate) {
    this.winningForm.querySelectorAll(E.INPUT).forEach((input) => (input.disabled = STATE.TRUE));
    this.modalBody.innerHTML = ResultModal(result, profitRate);
    this.openModal();
  }

  closeModal() {
    this.modal.classList.remove(CLASS.OPEN);
  }

  openModal() {
    this.modal.classList.add(CLASS.OPEN);
  }
}
