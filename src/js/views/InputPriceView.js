import View from './View.js';
import { $ } from '../utils/dom.js';

export default class InputPriceView extends View {
  constructor($element) {
    super($element);
    this.bindInputPriceEvent();
  }

  resetInputPrice() {
    $('#input-price-form').reset();
    $('#input-price').focus();
  }

  bindInputPriceEvent() {
    this.$element.addEventListener('submit', e => this.inputPriceHandler(e));
  }

  inputPriceHandler(e) {
    e.preventDefault();
    this.emit('submitPrice', e.target.elements.price.value);
  }
}
