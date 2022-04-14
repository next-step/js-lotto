import { createFormData } from '../../dom/index.js';
import View from '../View.js';

export default class MoneyForm extends View {
  render(_, reset) {
    reset && this.#reset();
  }

  bindEvent() {
    this.$el.addEventListener('submit', this.#onSubmitMoney.bind(this));
  }

  #onSubmitMoney(event) {
    event.preventDefault();
    const formData = createFormData(this.$el);

    this.emit('@buy', formData.get('money'));
  }

  #reset() {
    this.$el.reset();
  }
}
