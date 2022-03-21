import Component from '../core/Component.js';
import { store } from '../store/store.js';
import { SET_PRICE } from '../store/actions.js';
import { setPrice } from '../store/creator.js';
import { $ } from '../utils/dom.js';
import {
  INVALID_LOTTO_PRICE,
  INVALID_LOTTO_MINIMUM_PRICE,
  INVALID_LOTTO_MAXIMUM_PRICE,
} from '../utils/constants.js';

class BuyLottoSection extends Component {
  constructor(target) {
    super(target);
  }

  actionMap = {
    SET_PRICE: (money) => {
      store.dispatch(setPrice(money));
    },
  };

  setEvents() {
    $('#input-price-btn').addEventListener('click', (event) => {
      const action = event.target.dataset.action;
      const input = $('#input-price');
      const price = +input.value;
      if (
        this.validation.lottomMinimumPrice(price) ||
        this.validation.lottomMaximumPrice(price) ||
        this.validation.lottoPrice(price)
      )
        return;
      this.actionMap[action](price);
    });
  }

  validation = {
    lottoPrice: (money) => {
      if (money % 1000 !== 0) {
        alert(INVALID_LOTTO_PRICE);
        return true;
      }
      return false;
    },
    lottomMinimumPrice: (money) => {
      if (money < 1000) {
        alert(INVALID_LOTTO_MINIMUM_PRICE);
        return true;
      }
      return false;
    },
    lottomMaximumPrice: (money) => {
      if (100000 < money) {
        alert(INVALID_LOTTO_MAXIMUM_PRICE);
        return true;
      }
      return false;
    },
  };

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
                <input type="number" id="input-price" class="w-100 mr-2 pl-2" name="price" placeholder="구입 금액" value="${
                  props.price !== 0 ? props.price : ''
                }" required="" min="1000" max="100000">
                <button type="submit" id="input-price-btn" class="btn btn-cyan" data-action=${SET_PRICE}>
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
