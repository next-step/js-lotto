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

    this.observable.subscribe(notifyTypes.BUY_LOTTIES, this.render.bind(this));

    this.initEvent();
  }

  initEvent() {
    this.$buyBtn.addEventListener("click", () => {
      this.lottoController.handleBuyLotties(this.$priceInput.value);
    });
  }

  renderLottieControlPanel(curLotties) {
    const $lottieControlPanel = $.create("div").addClass("d-flex");

    const $totalCountLabel = $.create("label")
      .addClass("flex-auto", "my-0")
      .setText(`총 ${curLotties.length}개를 구매하였습니다.`);

    const $lottieNumberToggleWrapper = $.create("div").addClass("flex-auto", "d-flex", "justify-end", "pr-1");
    const $lottieNumberToggleBtn = $.create("label")
      .addClass("switch")
      .appendElement($.create("input").setAttr("type", "checkbox").addClass("lotto-numbers-toggle-button"))
      .appendElement($.create("span").addClass("text-base", "font-normal").setText("번호보기"));
    $lottieNumberToggleWrapper.appendElement($lottieNumberToggleBtn);

    this.$lottiesPanel.appendElement(
      $lottieControlPanel.appendElement($totalCountLabel).appendElement($lottieNumberToggleWrapper)
    );
  }

  renderLottieList(curLotties) {
    const lottoTemplate = /* html */ `
        <span class="mx-1 text-4xl">🎟️ </span>
    `;

    const lottieListHTML = curLotties.map((_) => lottoTemplate).join("");
    const $lottieListContainer = $.create("div").addClass("lottie-list", "d-flex", "flex-wrap").setHTML(lottieListHTML);
    this.$lottiesPanel.appendElement($lottieListContainer);
  }

  renderNumberCheckForm() {
    const $numberCheckForm = $.qs(".number-check-form");
    $numberCheckForm.setStyle("display", "block");
  }

  render(curLotties) {
    this.$lottiesPanel.setHTML("");

    this.renderLottieControlPanel(curLotties);
    this.renderLottieList(curLotties);
    this.renderNumberCheckForm();
  }
}

export default new View();
