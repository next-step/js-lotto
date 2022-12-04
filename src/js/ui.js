import {
  calculatorReturnLate,
  getTotalSum,
  removeAllChildNodes,
  toggleClass,
} from "./utils.js";
import { PRICE_BY_RANK, RANK_BY_MATCHED_NUMBERS } from "./constants.js";

class Ui {
  #lottoList;
  #purchasedLottos;
  #purchasedCount;
  #viewNumbersCheckbox;
  #checkWinningNumberArea;
  #totalReturnRate;
  #restartButton;
  #modal;

  constructor() {
    this.#lottoList = document.querySelector("#lotto-list");
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
    this.#restartButton = document.querySelector(".restart-lotto-button");
    this.$amountInput = document.querySelector("#purchase-amount-input");
    this.$winningInputs = document.querySelectorAll(".winning-number");
    this.$bonusInput = document.querySelector(".bonus-number");
  }

  get modal() {
    return this.#modal;
  }

  onViewNumbers(checked) {
    toggleClass({
      $element: this.#lottoList,
      className: "expanded",
      flag: checked,
    });
  }

  onCloseResultModal() {
    this.#modal.classList.remove("open");
  }

  getLottoElement(lotto) {
    const $newListItem = document.createElement("li");
    const $listOfLottoNumber = document.createElement("span");
    const $listOfLottoIcon = document.createElement("span");

    $newListItem.className = "d-flex mx-1 text-4xl";
    $listOfLottoIcon.className = "lotto-icon";
    $listOfLottoNumber.className = "lotto-detail ml-1";
    $listOfLottoIcon.innerText = "🎟";
    $listOfLottoNumber.innerText = lotto.join(", ");

    $newListItem.appendChild($listOfLottoIcon);
    $newListItem.appendChild($listOfLottoNumber);

    return $newListItem;
  }

  #clearInputs() {
    this.$amountInput.value = "";
    this.$bonusInput.value = "";
    this.$winningInputs.forEach((winningInput) => {
      winningInput.value = "";
    });
  }

  #initilizePurchasedView() {
    this.#clearInputs();
    this.#purchasedLottos.classList.remove("display");
    this.#checkWinningNumberArea.classList.remove("display");
  }

  #initializeWinningCount() {
    const $counts = document.querySelectorAll(".match-count");

    $counts.forEach(($count) => {
      $count.innerText = 0;
      return $count;
    });
  }

  #renderLottoElements(lottos) {
    removeAllChildNodes(this.#lottoList);

    lottos.forEach((lotto) => {
      const $lottoElement = this.getLottoElement(lotto);
      this.#lottoList.appendChild($lottoElement);
    });
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

    this.#totalReturnRate.innerText = calculatorReturnLate(
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
    this.#modal.classList.add("open");
  }

  render(state) {
    this.#renderPurchasedView();
    this.#renderLottoElements(state.lottos);
    this.#renderLottoCount(state.gameCount);
  }

  reset() {
    this.#initilizePurchasedView();
    this.#initializeWinningCount();
    this.onCloseResultModal();
  }
}

export default Ui;
