import {
  calculatorReturnRate,
  getTotalSum,
  removeAllChildNodes,
  toggleClass,
} from "./utils.js";
import {
  MANUAL_LOTTO_INPUTS_TEMPLATE,
  PRICE_BY_RANK,
  RANK_BY_MATCHED_NUMBERS,
} from "./constants.js";

class Ui {
  #lottoList;
  #manualLottoList;
  #purchasedLottos;
  #purchasedCount;
  #viewNumbersCheckbox;
  #checkWinningNumberArea;
  #totalReturnRate;
  #isResultModalOpened;
  #restartButton;
  #modal;

  constructor() {
    this.#lottoList = document.querySelector("#lotto-list");
    this.#manualLottoList = document.querySelector("#manual-lotto-list");
    this.#purchasedLottos = document.querySelector("#purchased-lottos");
    this.#purchasedCount = document.querySelector(".purchased-count");
    this.#viewNumbersCheckbox = document.querySelector(
      "#view-numbers-checkbox"
    );
    this.#checkWinningNumberArea = document.querySelector(
      "#check-winning-number-area"
    );
    this.#totalReturnRate = document.querySelector(".total-return-rate");
    this.#modal = document.querySelector("#modal");
    this.#isResultModalOpened = false;
    this.#restartButton = document.querySelector(".restart-lotto-button");
    this.$amountInput = document.querySelector("#purchase-amount-input");
    this.$winningInputs = document.querySelectorAll(".winning-number");
    this.$bonusInput = document.querySelector(".bonus-number");
  }

  get manualLottoList() {
    return this.#manualLottoList;
  }

  get modal() {
    return this.#modal;
  }

  get isResultModalOpened() {
    return this.#isResultModalOpened;
  }

  onViewNumbers(checked) {
    toggleClass({
      $element: this.#lottoList,
      className: "expanded",
      flag: checked,
    });
  }

  handledOpenResultModal() {
    this.#modal.classList.add("open");
    this.#isResultModalOpened = true;
  }

  handledCloseResultModal() {
    this.#modal.classList.remove("open");
    this.#isResultModalOpened = false;
  }

  #createManualLotto() {
    const $manualListItem = document.createElement("li");

    $manualListItem.className = "manual-lotto-list-item";
    $manualListItem.setAttribute(
      "index",
      this.#manualLottoList.childElementCount
    );
    $manualListItem.insertAdjacentHTML(
      "afterbegin",
      MANUAL_LOTTO_INPUTS_TEMPLATE
    );

    return $manualListItem;
  }

  addManualLotto() {
    const $createdManualLotto = this.#createManualLotto();
    this.#manualLottoList.prepend($createdManualLotto);
  }

  #createLotto(lotto) {
    return `
      <li class="d-flex mx-1 text-4xl">
        <span class="lotto-icon">🎟</span>
        <span class="lotto-detail ml-1">${lotto.join(", ")}</span>
      </li>
    `;
  }

  #clearInputs() {
    this.$amountInput.value = "";
    this.$bonusInput.value = "";
    this.$winningInputs.forEach((winningInput) => {
      winningInput.value = "";
    });
  }

  #initializePurchasedView() {
    removeAllChildNodes(this.#manualLottoList);

    this.#clearInputs();
    this.#purchasedLottos.classList.remove("display");
    this.#checkWinningNumberArea.classList.remove("display");
  }

  #initializeWinningCount() {
    const $counts = document.querySelectorAll(".match-count");

    $counts.forEach(($count) => {
      $count.innerText = 0;
    });
  }

  #renderLottoElements(lottos) {
    removeAllChildNodes(this.#lottoList);
    let createdLottos = "";

    lottos.forEach((lotto) => {
      createdLottos += this.#createLotto(lotto);
    });

    this.#lottoList.insertAdjacentHTML("afterbegin", createdLottos);
  }

  #renderLottoCount(count) {
    this.#purchasedCount.innerText = count;
  }

  #renderPurchasedView() {
    this.#purchasedLottos.classList.add("display");
    this.#checkWinningNumberArea.classList.add("display");
    this.#lottoList.classList.remove("expanded");
    this.#viewNumbersCheckbox.checked = false;
  }

  renderTotalReturnRate(statistics) {
    const convertedMatchCountsToArray = Object.entries(statistics);
    const calculatedAmountByRank = convertedMatchCountsToArray.map(
      ([key, value]) => PRICE_BY_RANK[key] * value
    );

    const totalPrizeMoney = getTotalSum(calculatedAmountByRank);

    this.#totalReturnRate.innerText = calculatorReturnRate(
      totalPrizeMoney,
      Number(this.$amountInput.value)
    );
  }

  renderWinningCount(statistics) {
    this.#initializeWinningCount();

    const convertedMatchCountsToArray = Object.entries(statistics);

    convertedMatchCountsToArray.forEach(([key, value]) => {
      const $matchCount = document.querySelector(
        `.${RANK_BY_MATCHED_NUMBERS[key]}`
      );
      $matchCount.innerText = value;
    });
  }

  renderModal(statistics) {
    this.renderTotalReturnRate(statistics);
    this.renderWinningCount(statistics);
    this.handledOpenResultModal();
  }

  render(state) {
    this.#renderPurchasedView();
    this.#renderLottoElements(state.lottos);
    this.#renderLottoCount(state.gameCount);
  }

  reset() {
    this.#initializePurchasedView();
    this.#initializeWinningCount();
    this.handledCloseResultModal();
  }
}

export default Ui;
