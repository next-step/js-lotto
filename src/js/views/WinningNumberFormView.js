import { selector } from "../utils/common.js";
import View from "./View.js";

class WinningNumberFormView extends View {
  tag = "WinningNumberFormView";
  constructor() {
    super();
  }

  bindEvent() {
    this.on('submit', e => {
      e.preventDefault();
    });
  }

}

export default new WinningNumberFormView();
