import { CLASS } from '../../const/className.js';
import { $Curry, createFormData, insertAdjacentHTML } from '../../dom/index.js';
import { range } from '../../utils/index.js';
import View from '../View.js';

const winningNumberTemplateCurry = (min, max) => name =>
  `
  <input
    required
    type="number"
    name="${name}"
    class="${name} mx-1 text-center"
    min="${min}"
    max="${max}"
  />
`;

export default class WinningForm extends View {
  init() {
    this.#printWinningNumberInputs();

    this.bindEvent();
    this.hide();
    return this;
  }

  render(_, reset) {
    this.$el.reset();
    reset ? this.hide() : this.show();
  }

  bindEvent() {
    this.$el.addEventListener('submit', this.#onSubmitWinningNumbers.bind(this));
  }

  #printWinningNumberInputs() {
    const $ = $Curry(this.$el);
    const makeTemplateWithRange = winningNumberTemplateCurry(1, 45);

    const winningNumbersTemplate = range(6)
      .map(() => makeTemplateWithRange('winning-number'))
      .join('');

    const bonusNumberTemplate = makeTemplateWithRange('bonus-number');

    insertAdjacentHTML($(CLASS.WINNING_NUMBERS_CONTAINER), winningNumbersTemplate);

    insertAdjacentHTML($(CLASS.WINNING_BONUS_CONTAINER), bonusNumberTemplate);
  }

  #onSubmitWinningNumbers(event) {
    event.preventDefault();

    const formData = createFormData(this.$el);

    const winningNumbers = formData.getAll('winning-number').map(Number);
    const bonusNumber = Number(formData.get('bonus-number'));

    this.emit('@submit-winning-numbers', { winningNumbers, bonusNumber });
  }
}
