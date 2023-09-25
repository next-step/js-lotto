import { $ } from '../utils/dom';

export class ModalView {
  #modalClose;
  #modal;
  #restart;

  constructor() {
    this.#modalClose = $('.modal-close');
    this.#modal = $('.modal');
    this.#restart = $('.restart-btn');
  }

  openModal() {
    this.#modal.classList.add('open');
  }

  closeModal() {
    this.#modal.classList.remove('open');
  }

  get modalClose() {
    return this.#modalClose;
  }

  get restart() {
    return this.#restart;
  }
}
