const $modalClose = ".modal-close";

import { lottoWinningNumberCounter } from "../../js/Lotto/LottoWinningDataMaker.js";
import { ERROR_MESSAGES } from "../../js/constants.js";

export default class LottoWinForm {
  constructor({ $target, lottoNumberArr, onSubmit }) {
    this.$target = $target;
    this.lottoNumberArr = lottoNumberArr;
    this.$form = $target.querySelector("#lotto-win-form");
    this.$modal = $target.querySelector(".modal");
    this.$openResultModalButton = this.$form.querySelector(
      ".open-result-modal-button"
    );

    this.$openResultModalButton.addEventListener("click", onSubmit);
    this.$modal
      .querySelector($modalClose)
      .addEventListener("click", this.handleModalClose);

    this.state = {
      modalOpened: false,
      statisticsMade: false,
      lottoWinNumberCountMap: {},
      lottoNumberArr: [],
    };
  }

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      this.state[key] = value;
    }
    this.render();
  }

  render() {
    for (const [key, value] of Object.entries(
      this.state.lottoWinNumberCountMap
    )) {
      this.$modal.getElementsByClassName(
        `winning-count-${key}`
      )[0].textContent = value;
    }

    if (this.state.modalOpened) {
      this.$modal.classList.add("open");
    } else {
      this.$modal.classList.remove("open");
    }
  }

  handleModalClose = () => {
    this.state["modalOpened"] = false;
    this.setState(this.state);
  };
}
