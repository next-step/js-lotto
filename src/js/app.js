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
      case target.classList.contains('lotto-buy-submit-button'):
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
    const $lottoBuyFormInput = this.#element.querySelector('.lotto-buy-price-input');
    const price = parseInt($lottoBuyFormInput.value, 10);
    this.#lotto.buy(price);

    if (this.#lotto.data.length) {
      this.#renderLottoListContainer();
      this.#renderLottoList();
    }
  }

  #renderLottoListContainer() {
    const $lottoListContainer = this.#element.querySelector('.lotto-list-container');
    $lottoListContainer.innerHTML = `
      <div class="d-flex">
        <label class="flex-auto my-0">
          총 <span class="lotto-list-count">${this.#lotto.data.length}</span>개를 구매하였습니다.
        </label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input type="checkbox" class="lotto-list-toggle-button" />
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div class="d-flex flex-wrap lotto-list"></div>`;
  }

  #renderLottoList() {
    const $lottoList = this.#element.querySelector('.lotto-list');
    $lottoList.innerHTML = this.#lotto.data.map(() => `<span class="mx-1 text-4xl lotto-item">🎟️</span>`).join('');
  }
}

export default App;
