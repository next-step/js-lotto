import View from '../View.js';

class WinningForm extends View {
  constructor($el) {
    super($el);
  }

  init() {
    this.bindEvent();
    this.hide();
    return this;
  }

  render() {
    this.show();
  }

  bindEvent() {}
}

export default ($el) => new WinningForm($el);
