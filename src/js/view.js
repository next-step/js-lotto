import observable from "./util/observable.js";
import controller from "./controller.js";
import { $ } from "./util/domController.js";

import { notifyTypes } from "./util/constants.js";

class View {
  constructor() {
    this.lottoController = controller;
    this.isShowLottoNumbers = false;

    this.$priceInput = $.qs(".price-input");
    this.$buyBtn = $.qs(".buy-btn");
    this.$lottiesPanel = $.qs(".lottie-panel");
    this.$lottieControlPanel = $.qs(".lottie-control-panel");
    this.$lottieListContainer = $.qs(".lottie-list");
    this.$winningNumberInputs = $.qs(".winning-number-inputs");
    this.$bonnusWinningNumberInput = $.qs(".bonus-number");

    // modal component
    this.$modal = $.qs(".modal");
    this.$modalCloseBtn = $.qs(".modal-close");
    this.$showResultBtn = $.qs(".open-result-modal-button");

    this.initObservable();
    this.initEvent();
  }

  initObservable() {
    observable.subscribe(notifyTypes.BUY_LOTTIES, this.render.bind(this));
    observable.subscribe(notifyTypes.TOGGLE_SHOW_LOTTIES_NUMBERS, this.renderLottieList.bind(this));
    observable.subscribe(notifyTypes.SHOW_LOTTIE_WINNING_INFO, this.renderResultModal.bind(this));
  }

  initEvent() {
    this.$buyBtn.addEventListener("click", this.onLottieBuy);
    this.$showResultBtn.addEventListener("click", this.onModalOpen);
    this.$modalCloseBtn.addEventListener("click", this.onModalClose);
    this.$winningNumberInputs.addEventListener("input", ({ target }) => {
      if (target.tagName === "INPUT") {
        this.onWinningLottoDigitsInput(target);
      }
    });
    this.$bonnusWinningNumberInput.addEventListener("input", ({ target }) => {
      this.onWinningLottoDigitsInput(target);
    });
  }

  onLottieBuy = () => {
    this.lottoController.handleBuyLottiesBtnClick(this.$priceInput.value);
  };

  onModalOpen = () => {
    if (!this.lottoController.canShowModal()) {
      alert("당첨 번호이 형식이 옳바르지 않습니다");
      return;
    }
    this.$modal.addClass("open");
    this.lottoController.handleModalOpen();
  };

  onModalClose = () => {
    this.$modal.removeClass("open");
    this.lottoController.handleModalClose();
  };

  onWinningLottoDigitsInput({ dataset, value }) {
    this.lottoController.handleInputWinningLottoDigits(dataset.order, value);
  }

  renderLottieControlPanel(curLotties) {
    this.$lottieControlPanel.setHTML(" ");

    const $totalCountLabel = $.create("label")
      .addClass("flex-auto", "my-0", "total-lottie")
      .setText(`총 ${curLotties.length}개를 구매하였습니다.`);

    const $lottieNumberToggleWrapper = $.create("div").addClass("flex-auto", "d-flex", "justify-end", "pr-1");

    const $lottieNumberToggleInput = $.create("input")
      .setAttr("type", "checkbox")
      .addClass("lotto-numbers-toggle-button");

    const $lottieNumberToggleBtn = $.create("label")
      .addClass("switch")
      .appendElement($lottieNumberToggleInput)
      .appendElement($.create("span").addClass("text-base", "font-normal").setText("번호보기"));

    $lottieNumberToggleInput.addEventListener("change", () => {
      this.isShowLottoNumbers = !this.isShowLottoNumbers;
      this.lottoController.handleShowLottieNumBtnToggle();
    });

    $lottieNumberToggleWrapper.appendElement($lottieNumberToggleBtn);

    this.$lottiesPanel.appendElement(
      this.$lottieControlPanel.appendElement($totalCountLabel).appendElement($lottieNumberToggleWrapper)
    );
  }

  renderLottieList(curLotties) {
    this.$lottieListContainer.setHTML("");

    const lottoTemplate = (number) => /* html */ `
        <span class="lotto mx-1 text-4xl">🎟️ 
          <span class="lotto-number">${number}</span>
        </span>
    `;

    this.isShowLottoNumbers
      ? this.$lottieListContainer.addClass("flex-col")
      : this.$lottieListContainer.removeClass("flex-col");

    const lottieListHTML = curLotties.map((number) => lottoTemplate(this.isShowLottoNumbers ? number : "")).join("");
    this.$lottieListContainer.setHTML(lottieListHTML);

    this.$lottiesPanel.appendElement(this.$lottieListContainer);
  }

  renderNumberCheckForm() {
    const $numberCheckForm = $.qs(".number-check-form");
    $numberCheckForm.setStyle("display", "block");
  }

  renderResultModal(profitRatio, winningInfo) {
    const $modalContent = $.qs(".modal-content");
    const $resultTable = $.qs(".result-table");
    const $earnMoneyPanel = $.qs(".earn-money");
    let $resultTableBody = $.qs(".result-table-body");

    $resultTableBody && $resultTable.removeChild($resultTableBody);
    $earnMoneyPanel && $modalContent.parentElement.removeChild($earnMoneyPanel);

    $resultTableBody = document.createElement("tbody");
    $resultTableBody.classList.add("result-table-body");
    $resultTableBody.innerHTML = /* html */ `
      <tr class="text-center">
        <td class="p-3">3개</td>
        <td class="p-3">5,000</td>
        <td class="p-3">${winningInfo["THREE"]}개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">4개</td>
        <td class="p-3">50,000</td>
        <td class="p-3">${winningInfo["FOUR"]}개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">5개</td>
        <td class="p-3">1,500,000</td>
        <td class="p-3">${winningInfo["FIVE"]}개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">5개 + 보너스볼</td>
        <td class="p-3">30,000,000</td>
        <td class="p-3">${winningInfo["FIVE_WITH_BONUS"]}개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">6개</td>
        <td class="p-3">2,000,000,000</td>
        <td class="p-3">${winningInfo["ALL"]}개</td>
      </tr>
    `;
    $resultTable.appendChild($resultTableBody);
    $modalContent.insertAdjacentHTML(
      "afterend",
      /* html */ `
      <p class="earn-money text-center font-bold">당신의 총 수익률은 ${profitRatio}%입니다.</p>
    `
    );
  }

  render(curLotties) {
    this.renderLottieControlPanel(curLotties);
    this.renderLottieList(curLotties);
    this.renderNumberCheckForm();
  }
}

export default View;
