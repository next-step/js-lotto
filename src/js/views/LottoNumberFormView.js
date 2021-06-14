import View from './View.js';
import { $, $$ } from '../utils/utils.js';

export default class LottoNumberFormView extends View {
  constructor(el) {
    super(el);
    this.bindEvents();
  }

  init() {
    $('.bonus-number').value = '';

    $$('.winning-number').forEach((inputElement) => {
      inputElement.value = '';
    });
  }

  bindEvents() {
    this.el.addEventListener('submit', (e) => this.onSubmitLottoNumber(e));
  }

  onSubmitLottoNumber(e) {
    e.preventDefault();
    this.emit('@submitLottoNumbers', new FormData(this.el));
  }
}
