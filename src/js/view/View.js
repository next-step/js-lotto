import { $ } from '../utils/index.js';

export class View {
  $element;

  constructor(selector) {
    this.$element = $(selector);
  }
}
