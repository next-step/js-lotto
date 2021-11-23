import View from "./view.js";
import el from "../dom.js";
import {$, $$} from "../utils.js";
import {DOM_ID, LOTTO_LENGTH} from "../constants.js";

export default class SelfLottoForm extends View {
  constructor() {
    super();
    this.$selfLottoList = $(DOM_ID.SELF_LOTTO_LIST);
    this.$autoGenerateButton = $(DOM_ID.AUTO_GENERATE_BUTTON);
    this.$selfLottoInput = $$(DOM_ID.SELF_LOTTO_INPUT);
    this.$selfLottoInputContainer = $$(DOM_ID.SELF_LOTTO_INPUT_CONTAINER);
  }

  createSelfLottoForm(amount) {
    for (let i = 0; i < amount; i++) {
      this.$selfLottoList.insertAdjacentElement('afterbegin',
        el('<div id="selfLottoInputContainer">',
          Array.from({length: LOTTO_LENGTH}, _ =>
            `<input type="number" class="self-number mx-1 text-center"/>`)));
    }
    this.updateLottoInputDom();
  }

  bindOnClickSelfGenerateButton(hander) {
    this.$autoGenerateButton.addEventListener('click', () => {
      hander();
    });
  }

  updateLottoInputDom() {
    this.$selfLottoInput = $$(DOM_ID.SELF_LOTTO_INPUT);
    this.$selfLottoInputContainer = $$(DOM_ID.SELF_LOTTO_INPUT_CONTAINER);
  }
}