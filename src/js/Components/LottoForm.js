import Component from "../Core/Component.js";
import { SET_PRICE } from "../modules/actions.js";
import { setPrice } from "../modules/creator.js";
import { store } from "../modules/store.js";
import { $ } from "../utils/dom.js";

const actionMap = {
  SET_PRICE: (money) => {
    store.dispatch(setPrice(money));
  },
};

export default class LottoForm extends Component {
  constructor(target) {
    super(target);
  }

  setEvent(target) {
    this.buttonEvent(target);
  }

  buttonEvent() {
    $("#input-price-btn").addEventListener("click", (event) => {
      const action = event.target.dataset.action;
      const input = $("#input-price");

      actionMap[action](input.value);
    });
  }

  template() {
    const props = store.getState();
    console.log(props);
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
                  props.price !== 0 ? props.price : ""
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
