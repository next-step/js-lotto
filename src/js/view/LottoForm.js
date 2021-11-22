import View from "./view.js"
import {$, $$} from "../utils.js";
import {DOM_ID} from "../constants.js";

export default class LottoForm extends View {
  constructor() {
    super();
    this.$lottoInputForm = $(DOM_ID.LOTTO_INPUT_FORM);
  }
};