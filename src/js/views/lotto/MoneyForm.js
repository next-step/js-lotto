import View from '../View.js';

class MoneyForm extends View {
  constructor($el) {
    super($el);
  }

  render() {}

  bindEvent() {
    this.$el.addEventListener('submit', this.#onSubmitMoney.bind(this));
  }

  #onSubmitMoney(event) {
    event.preventDefault();
    const formData = new FormData(this.$el);

    this.emit('@buy', formData.get('money'));
  }
}

export default ($el) => new MoneyForm($el);
