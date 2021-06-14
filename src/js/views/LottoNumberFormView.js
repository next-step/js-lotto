import View from './View.js';

export default class LottoNumberFormView extends View {
  constructor(el) {
    super(el);
    this.bindEvents();
  }

  bindEvents() {
    this.el.addEventListener('submit', (e) => this.onSubmitLottoNumber(e));
  }

  onSubmitLottoNumber(e) {
    e.preventDefault();
    this.emit('@submitLottoNumbers', new FormData(this.el));
  }
}
