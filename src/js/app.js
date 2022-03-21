import Lotto from './lotto.js';
import { templateLottoListContainer, templateLottoList, templateLottoListWithNumber } from './templates.js';

class App {
  /** @type {HTMLDivElement} */
  #element;

  /** @type {Lotto} */
  #lotto;

  /**
   * @param {HTMLDivElement} element
   */
  constructor(element) {
    if (!element instanceof HTMLDivElement) {
      throw new Error('element는 HTMLDivElement 타입이여야 합니다.');
    }

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
      case target.classList.contains('lotto-buy-submit-button'):
        this.#handleLottoBuy();
        break;
      case target.classList.contains('lotto-list-toggle-button'): {
        this.#renderLottoList(target.checked);
        break;
      }
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
    const $lottoBuyFormInput = this.#element.querySelector('.lotto-buy-price-input');
    const price = parseInt($lottoBuyFormInput.value, 10);
    this.#lotto.init();
    this.#lotto.buy(price);

    if (this.#lotto.data.length) {
      this.#renderLottoListContainer();
      this.#renderLottoList(false);
    }
  }

  #renderLottoListContainer() {
    const $lottoListContainer = this.#element.querySelector('.lotto-list-container');
    $lottoListContainer.innerHTML = templateLottoListContainer(this.#lotto.data.length);
  }

  /**
   * @param {boolean} showNumber
   */
  #renderLottoList(showNumber) {
    const data = this.#lotto.data;
    const $lottoList = this.#element.querySelector('.lotto-list');
    $lottoList.innerHTML = showNumber ? templateLottoListWithNumber(data) : templateLottoList(data);
  }
}

export default App;
