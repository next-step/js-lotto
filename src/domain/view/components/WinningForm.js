import { CLASS, EMPTY_STRING, STATE } from '../../constants/index.js';

export class WinningForm {
  constructor({ winning }) {
    this.winningForm = winning;
    this.render();
  }

  render() {
    const $inputs = this.winningForm.querySelectorAll('input');
    const $button = this.winningForm.querySelector('button');

    this.winningForm.classList.add(CLASS.HIDDEN);
    $inputs.forEach((input) => (input.disabled = STATE.FALSE));
    $inputs.forEach((input) => (input.value = EMPTY_STRING));
    $button.disabled = STATE.TRUE;
  }

  disableInputs() {
    const $inputs = this.winningForm.querySelectorAll('input');

    $inputs.forEach((input) => (input.disabled = STATE.TRUE));
  }

  showErrorMessage(message) {
    const $error = this.winningForm.querySelector('span');
    const $button = this.winningForm.querySelector('button');

    $error.innerHTML = message;
    $error.classList.toggle(CLASS.HIDDEN, message === EMPTY_STRING);
    $button.disabled = message === EMPTY_STRING ? STATE.FALSE : STATE.TRUE;
  }

  showForm() {
    this.winningForm.classList.remove(CLASS.HIDDEN);
  }

  replaceEvent(type, removeFn, addFn) {
    this.winningForm.removeEventListener(type, removeFn);
    this.winningForm.addEventListener(type, addFn);
  }
}
