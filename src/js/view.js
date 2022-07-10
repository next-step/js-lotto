import observable from "./util/observable.js";
import controller from "./controller.js";
import { $ } from "./util/domController.js";

import { notifyTypes } from "./util/constants.js";

class View {
  constructor() {
    this.observable = observable;
    this.lottoController = controller;

    this.$priceInput = $.qs(".price-input");
    this.$buyBtn = $.qs(".buy-btn");
    this.$lottiesPanel = $.qs(".lottie-panel");

    this.observable.subscribe(notifyTypes.BUY_LOTTIES, this.renderLottieList.bind(this));

    this.initEvent();
  }

  initEvent() {
    this.$buyBtn.addEventListener("click", () => {
      this.lottoController.handleBuyLotties(this.$priceInput.value);
    });
  }

  renderLottieList(curLotties) {
    const lottoTemplate = /* html */ `
        <span class="mx-1 text-4xl">🎟️ </span>
    `;

    const lottieListHTML = curLotties.map((_) => lottoTemplate).join("");
    const $lottieListContainer = $.create("div").addClass("lottie-list", "d-flex", "flex-wrap").setHTML(lottieListHTML);
    this.$lottiesPanel.appendChild($lottieListContainer);
  }
}

export default new View();
