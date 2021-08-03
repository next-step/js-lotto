import Component from "../Core/Component.js";
import LottoPurchasedNum from "./LottoPurchasedNum.js";
import { SHOW_NUMBERS } from "../modules/actions.js";
import { showNumbers } from "../modules/creator.js";
import { store } from "../modules/store.js";
import { $ } from "../utils/dom.js";

const actionMap = {
  SHOW_NUMBERS: (isShow) => {
    store.dispatch(showNumbers(isShow));
  },
};

export default class LottoNumForm extends Component {
  constructor(target) {
    super(target);
  }

  setEvent(target) {
    this.buttonEvent(target);
    this.toggleEvent();
  }

  buttonEvent() {}
  toggleEvent() {
    $("#lotto-switch").addEventListener("click", (event) => {
      actionMap[SHOW_NUMBERS](event.target.checked);
      const props = store.getState();
      console.log(props);
      console.log(event.target.checked);
    });
  }

  template() {
    const props = store.getState();
    const lottoNum = +props.price / 1000;
    console.log(props);
    console.log($("#lotto-icons"));
    const icons = new Array(lottoNum).fill(0);

    return `
    <section id="purchased-lottos" class="mt-9" aria-label="purchase-items" style="display: block;">
        <div class="d-flex">
        <label class="flex-auto my-0">총 <span id="total-purchased">${lottoNum}</span>개를
            구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
            <input id="lotto-switch" type="checkbox" class="lotto-numbers-toggle-button" ${
              props.isShow ? "CHECKED" : ""
            }>
            <span class="text-base font-normal">번호보기</span>
            </label>
        </div>
        </div>
        <ul id="lotto-icons" class="${
          props.isShow ? "d-flex flex-wrap flex-col" : "d-flex flex-wrap"
        }"
        }>
          ${icons.map(
            () =>
              `<li class="mx-1 text-4xl lotto-wrapper">
              <span class="lotto-icon">🎟️ </span>
              <span class="lotto-detail" style=
                "${props.isShow ? "display: inline" : "display: none"}"
              }">18, 43, 23, 37, 31, 17</span>
          </li>`
          )}
    </ul>
    </section>
    `;
  }
}
