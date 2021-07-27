import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constants.js";

function VisibleToggle({ onVisibleToggle }) {
  this.$target = $(SELECTORS.LOTTO_TOGGLE);
  this.onVisibleToggle = onVisibleToggle;

  this.bindEvents = () => {
    this.$target.addEventListener("change", this.onVisibleToggle);
  };

  this.bindEvents();
}

export default VisibleToggle;
