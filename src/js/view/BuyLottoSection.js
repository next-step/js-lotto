import Component from '../core/Component.js';
import store from '../store/store.js';
import validation from '../validation.js';
import actionMap from '../actionMap.js';
import { $ } from '../utils/dom.js';

class BuyLottoSection extends Component {
  constructor(target) {
    super(target);
    this.input = $('#input-price');
  }

  setEvents() {
    $('#input-price-btn').addEventListener('click', (event) => {
      const price = Number(this.input.value);
      if (
        validation.lottomMinimumPrice(price) ||
        validation.lottomMaximumPrice(price) ||
        validation.lottoPrice(price)
      )
        return;
      actionMap?.SET_PRICE(price);
    });
  }

  template() {
    const props = store.getState();
    return `
      <form onSubmit="return false">
          <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <form id="input-price-form" class="mt-5" aria-labelledby="input-price" style="display: block;">
              <label for="input-price" class="mb-2 d-inline-block">
                구입할 금액을 입력해주세요.
              </label>
              <div class="d-flex">
                <input type="number" id="input-price" class="w-100 mr-2 pl-2" name="price" placeholder="구입 금액" value="${props.price}" required="" min="1000" max="100000">
                <button type="submit" id="input-price-btn" class="btn btn-cyan">
                  확인
                </button>
              </div>
          </form>
      </div>
      </form>
    `;
  }
}

export default BuyLottoSection;
