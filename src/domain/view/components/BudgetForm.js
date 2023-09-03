import { EMPTY_STRING, SELECTOR, STATE, CLASS } from '../../constants/index.js';

export class BudgetForm {

  constructor({app}) {
    this.budgetForm = app.querySelector(SELECTOR.BUDGET_FORM);
    this.render();
  }

  render() {
    const $input = this.budgetForm.querySelector('input');
    const $button = this.budgetForm.querySelector('button');
    
    $input.disabled = STATE.FALSE;
    $button.disabled = STATE.TRUE;
    $input.value = EMPTY_STRING;
  }

  showErrorMessage(message) {
    const $error = this.budgetForm.querySelector('span');
    const $button = this.budgetForm.querySelector('button');

    $error.innerHTML = message;
    $error.classList.toggle(CLASS.HIDDEN, message === EMPTY_STRING);
    $button.disabled = message === EMPTY_STRING ? STATE.FALSE : STATE.TRUE;
  }

  disabledBudget() {
    const $input = this.budgetForm.querySelector('input');
    const $button = this.budgetForm.querySelector('button');

    $input.disabled = STATE.TRUE;
    $button.disabled = STATE.TRUE;
  }

}