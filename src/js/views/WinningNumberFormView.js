import { selector, selectorAll } from "../utils/common.js";
import { ERROR_MESSAGES } from "../constants/index.js";
import View from "./View.js";

class WinningNumberFormView extends View {
  tag = "WinningNumberFormView";
  constructor() {
    super();
  }

  bindEvent() {
    this
      .on("keyup", this.onKeyUp)
      .on("submit", this.onSubmit);
  }

  onKeyUp = ({ target, keyCode }) => {
    console.dir("onKeyUp__", keyCode);
    if (target.type === "number" && keyCode >= 48 && keyCode <= 57 && target.value.length == 2) {
      if (target.classList.contains("bonus-number")) return false;

      target.nextElementSibling
        ? target.nextElementSibling.focus()
        : selector(".bonus-number").focus()
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const winnings = [...selectorAll("input[type='number']", e.currentTarget)].map(v => Number(v.value));

    if (new Set(winnings).size < 7) {
      window.alert(ERROR_MESSAGES.DUPLICATE_NUMBER);
      return false;
    }

    this.emit("submit.updateWinnings", {
      winnings,
    });

  }

  initValue() {
    [...selectorAll("input[type='number']", this.$elem)].forEach(v => v.value = null);
    return this;
  }
}

export default new WinningNumberFormView();
