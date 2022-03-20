import Lotto from './lotto.js';

class App {
  /** @type {HTMLDivElement} */
  #element;

  /** @type {Lotto} */
  #lotto;

  /**
   * @param {HTMLDivElement} element
   */
  constructor(element) {
    this.#element = element;
    this.#lotto = new Lotto();
    this.#init();
  }

  #init() {
    this.#element.addEventListener('click', this.#handleElementClick);
    this.#element.addEventListener('submit', this.#handleElementSubmit);
  }

  /**
   * @param {MouseEvent} e
   * @param {HTMLElement} e.target
   */
  #handleElementClick = ({ target }) => {
    switch (true) {
      case target.classList.contains('lotto-buy-form-submit'):
        this.#handleLottoBuy();
        break;
      default:
        break;
    }
  };

  /**
   * @param {MouseEvent} e
   */
  #handleElementSubmit = (e) => {
    /**
     * @typedef {object} DestructuredEvent
     * @property {Element} target
     */
    /** @type {DestructuredEvent} */
    const { target } = e;
    switch (true) {
      case target.classList.contains('lotto-buy-form'):
        e.preventDefault();
        this.#handleLottoBuy();
        break;
      default:
        break;
    }
  };

  #handleLottoBuy() {
    /** @type {HTMLInputElement} */
    const $lottoBuyFormInput = this.#element.querySelector('.lotto-buy-form-input');
    const price = parseInt($lottoBuyFormInput.value, 10);
    this.#lotto.buy(price);
  }
}

export default App;
