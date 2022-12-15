const $modalClose = ".modal-close";

import { lottoWinningNumberCounter } from "../../js/Lotto/LottoWinningDataMaker.js";
import { ERROR_MESSAGES } from "../../js/constants.js";

export default class LottoWinForm {
  constructor({ $target, lottoNumberArrays }) {
    this.$target = $target;
    this.lottoNumberArrays = lottoNumberArrays;
    this.$form = $target.querySelector("#lotto-win-form");
    this.$modal = $target.querySelector(".modal");
    this.$openResultModalButton = this.$form.querySelector(
      ".open-result-modal-button"
    );

    this.$openResultModalButton.addEventListener(
      "click",
      this.handleSubmitWinForm
    );
    this.$modal
      .querySelector($modalClose)
      .addEventListener("click", this.handleModalClose);

    this.state = {
      modalOpened: false,
      statisticsMade: false,
      lottoWinNumberCountMap: {},
      lottoNumberArrays: [],
    };
  }

  setState(newState) {
    for (const [key, value] in Object.entries(newState)) {
      this.state[key] = value;
    }
    this.render();
  }

  isWinningBonusNumberDuplicated = (numArray) => {
    return numArray.some(
      (num) => numArray.indexOf(num) !== numArray.lastIndexOf(num)
    );
  };

  handleSubmitWinForm = () => {
    const winningNumbers = Array.from(
      this.$form.querySelectorAll(".winning-number")
    ).map((el) => Number(el.value));

    const bonusNumber = Number(this.$form.querySelector(".bonus-number").value);

    if (this.isWinningBonusNumberDuplicated([...winningNumbers, bonusNumber])) {
      alert(ERROR_MESSAGES.DUPLICATED_NUMBERS);
      return;
    }

    const lottoWinNumberCountMap = lottoWinningNumberCounter({
      lottoNumberArrays: this.state.lottoNumberArrays,
      lottoWinningsNumberArray: winningNumbers,
      lottoBonusNumber: bonusNumber,
    });

    this.state["lottoWinNumberCountMap"] = lottoWinNumberCountMap;
    this.state["statisticsMade"] = true;
    this.state["modalOpened"] = true;

    this.setState(this.state);
  };

  render() {
    for (const [key, value] of Object.entries(
      this.state.lottoWinNumberCountMap
    )) {
      this.$modal.querySelector(`.winning-count-${key}`).textContent = value;
    }

    if (this.state.modalOpened) {
      this.$modal.classList.add("open");
    } else {
      this.$modal.classList.remove("open");
    }
  }

  handleModalClose() {
    this.state[modalOpened] = false;
    this.setState(this.state);
  }
}
