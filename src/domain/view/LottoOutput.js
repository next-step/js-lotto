import { SELECTOR } from '../constants/index.js';

import { BudgetForm } from './components/BudgetForm.js';
import { LottoSection } from './components/LottoSection.js';
import { Modal } from './components/Modal.js';
import { WinningForm } from './components/WinningForm.js';

export class LottoOutput {
  constructor({ app }) {
    this.budgetForm = new BudgetForm({ budget: app.querySelector(SELECTOR.BUDGET_FORM) });
    this.winningForm = new WinningForm({ winning: app.querySelector(SELECTOR.WINNING_FORM) });
    this.lottoSection = new LottoSection({ lotto: app.querySelector(SELECTOR.LOTTO_SECTION) });
    this.modal = new Modal({ modal: app.querySelector(SELECTOR.MODAL) });
    this.render();
  }

  render() {
    this.budgetForm.render();
    this.winningForm.render();
    this.lottoSection.render();
  }

  showErrorMessage(elementId, message) {
    SELECTOR[elementId] === SELECTOR.BUDGET_INPUT
      ? this.budgetForm.showErrorMessage(message)
      : this.winningForm.showErrorMessage(message);
  }

  showLottos(lottos) {
    this.budgetForm.disabledBudget();
    this.lottoSection.showLottos(lottos);
    this.winningForm.showForm();
  }

  toggleLotto(isChecked) {
    this.lottoSection.toggleLotto(isChecked);
  }

  showResultModal(result, profitRate) {
    this.winningForm.disableInputs();
    this.modal.showResult(result, profitRate);
  }

  toggleModal() {
    this.modal.toggleModal();
  }
}
