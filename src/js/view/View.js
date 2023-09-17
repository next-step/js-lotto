import { $ } from '../utils/index.js';

export class View {
  $element;

  constructor(selector) {
    this.$element = $(selector);
  }

  show(display = 'block') {
    this.$element.style.display = display;
  }

  hide() {
    this.$element.style.display = 'none';
  }

  reset() {
    throw new Error('리셋 로직을 구성해주세요!');
  }
}
