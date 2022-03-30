import View from '../View.js';

const getLottoTemplate = lotto => `
  <li>
    <span class="mx-1 text-4xl lotto-icon">🎟️ </span>
    <span class="lotto-detail">${lotto}</span>
  </li>`;

class LottoDetailList extends View {
  constructor($el) {
    super($el);
  }

  init() {
    this.hide();
    return this;
  }

  render({ numbers = [] }, reset) {
    this.#resetList();
    this.#initializeToggleStyle();

    if (reset) {
      this.hide();
    } else {
      this.show();
      this.#printList(numbers);
    }
  }

  bindEvent() {}

  toggleStyle(showNumbers) {
    const key = showNumbers ? 'add' : 'remove';
    this.$el.classList[key]('flex-column');
  }

  #resetList() {
    while (this.$el.hasChildNodes()) {
      this.$el.firstChild.remove();
    }
  }

  #printList(numbers) {
    this.$el.insertAdjacentHTML('afterBegin', numbers.map(getLottoTemplate).join(''));
  }

  #initializeToggleStyle() {
    this.$el.classList.remove('flex-column');
  }
}

export default $el => new LottoDetailList($el);
