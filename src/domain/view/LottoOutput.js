import { CLASS, EVENT as E, EMPTY_STRING, SELECTOR, STATE } from '../constants/index.js';


import { BudgetForm } from './components/BudgetForm.js';
import { WinningForm } from './components/WinningForm.js';
import { LottoSection } from './components/LottoSection.js';
import { Modal } from './components/Modal.js';

export class LottoOutput {
  constructor({ app }) {
    this.budgetForm = new BudgetForm({app});
    this.winningForm = new WinningForm({app});
    this.lottoSection = new LottoSection({app});
    this.modal = new Modal({app});
    this.render();
  }

  render() {
    this.budgetForm.render();
    this.winningForm.render();
    this.lottoSection.render();
  }

  showErrorMessage(elementId, message) {
    elementId === 'budget_input' 
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
