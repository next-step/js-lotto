import View from './View.js';
import { $ } from '../utils/utils.js';

export default class ResultModalView extends View {
  constructor(el) {
    super(el);
    this.bindEvents();
  }

  openModal() {
    this.onModalShow();
  }

  bindEvents() {
    $('.modal-close').addEventListener('click', () => this.onModalClose());

    this.el.addEventListener('click', ({ currentTarget, target }) => {
      if (currentTarget !== target) return;
      this.onModalClose();
    });

    $('#reset').addEventListener('click', () => {
      this.onResetLotto();
    });
  }

  onModalShow() {
    this.el.classList.add('open');
  }

  onModalClose() {
    this.el.classList.remove('open');
  }

  onResetLotto() {
    this.onModalClose();
    this.emit('@resetLotto');
  }
}
