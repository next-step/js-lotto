import observable from "./util/observable.js";
import controller from "./controller.js";
import { $ } from "./util/domController.js";

import { notifyTypes } from "./util/constants.js";

class View {
  constructor() {
    this.lottoController = controller;

    this.$priceInput = $.qs(".price-input");
    this.$buyBtn = $.qs(".buy-btn");
    this.$lottiesPanel = $.qs(".lottie-panel");
    this.$lottieControlPanel = $.qs(".lottie-control-panel");
    this.$lottieListContainer = $.qs(".lottie-list");

    this.initObservable();
    this.initEvent();
  }

  initObservable() {
    observable.subscribe(notifyTypes.BUY_LOTTIES, this.render.bind(this));
    observable.subscribe(
      notifyTypes.TOGGLE_SHOW_LOTTIES_NUMBERS,
      this.renderLottieList.bind(this)
    );
  }

  initEvent() {
    this.$buyBtn.addEventListener("click", () => {
      this.lottoController.handleBuyLottiesBtnClick(this.$priceInput.value);
    });
  }

  renderLottieControlPanel(curLotties) {
    this.$lottieControlPanel.setHTML(" ");

    const $totalCountLabel = $.create("label")
      .addClass("flex-auto", "my-0", "total-lottie")
      .setText(`총 ${curLotties.length}개를 구매하였습니다.`);

    const $lottieNumberToggleWrapper = $.create("div").addClass(
      "flex-auto",
      "d-flex",
      "justify-end",
      "pr-1"
    );
    const $lottieNumberToggleInput = $.create("input")
      .setAttr("type", "checkbox")
      .addClass("lotto-numbers-toggle-button");
    const $lottieNumberToggleBtn = $.create("label")
      .addClass("switch")
      .appendElement($lottieNumberToggleInput)
      .appendElement(
        $.create("span")
          .addClass("text-base", "font-normal")
          .setText("번호보기")
      );
    $lottieNumberToggleInput.addEventListener("change", () => {
      this.lottoController.handleShowLottieNumBtnToggle(
        this.$lottieListContainer
      );
    });

    $lottieNumberToggleWrapper.appendElement($lottieNumberToggleBtn);

    this.$lottiesPanel.appendElement(
      this.$lottieControlPanel
        .appendElement($totalCountLabel)
        .appendElement($lottieNumberToggleWrapper)
    );
  }

  renderLottieList(curLotties) {
    this.$lottieListContainer.setHTML("");

    const lottoTemplate = (number) => /* html */ `
        <span class="mx-1 text-4xl">🎟️ ${number}</span>
    `;

    const isCol = this.$lottieListContainer.classList.contains("flex-col");

    const lottieListHTML = curLotties
      .map((number) => lottoTemplate(isCol ? number : ""))
      .join("");
    this.$lottieListContainer.setHTML(lottieListHTML);

    this.$lottiesPanel.appendElement(this.$lottieListContainer);
  }

  renderNumberCheckForm() {
    const $numberCheckForm = $.qs(".number-check-form");
    $numberCheckForm.setStyle("display", "block");
  }

  render(curLotties) {
    this.renderLottieControlPanel(curLotties);
    this.renderLottieList(curLotties);
    this.renderNumberCheckForm();
  }
}

export default new View();
