import Component from "../Core/Component.js";
import { SET_PRICE } from "../modules/actions.js";
import { setPrice } from "../modules/creator.js";
import { store } from "../modules/store.js";
import { $ } from "../utils/dom.js";

const actionMap = {};

export default class LottoForm extends Component {
  constructor(target) {
    super(target);
  }

  setEvent(target) {
    this.buttonEvent(target);
  }

  buttonEvent() {}

  template() {
    const props = store.getState();
    console.log(props);
    return `
    <li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️ </span>
        <span class="lotto-detail" style="display: inline;">18, 43, 23, 37, 31, 17</span>
    </li>
    `;
  }
}
