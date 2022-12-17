const $modalClose = ".modal-close";
const $modal = ".modal";

import { ERROR_MESSAGES, INITIAL_STATE } from "../constants.js";
import { isWinningBonusNumberDuplicated } from "../utils/random-utils.js";

const $lottoWinForm = "#lotto-win-form";
const $openResultModalButton = ".open-result-modal-button";
const $profitRateSpan = ".profit-rate";
const $restartButton = ".restart";

export default class LottoWinForm {
  constructor({ $target, lottoNumberArr, onSubmit, onClickRestartButton }) {
    this.$target = $target;
    this.lottoNumberArr = lottoNumberArr;
    this.$form = $target.querySelector($lottoWinForm);
    this.$modal = $target.querySelector($modal);
    this.$openResultModalButton = this.$form.querySelector(
      $openResultModalButton
    );
    this.onSubmit = onSubmit;
    this.$restartButton = $target.querySelector($restartButton);
    this.$profitRateSpan = $target.querySelector($profitRateSpan);

    this.$openResultModalButton.addEventListener("click", this.handleSubmit);
    this.$modal
      .querySelector($modalClose)
      .addEventListener("click", this.handleModalClose);
    this.$restartButton.addEventListener("click", onClickRestartButton);

    this.state = Object.assign({}, INITIAL_STATE.LOTTO_WIN_FORM);
  }

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      this.state[key] = value;
    }
    this.render();
  }

  handleSubmit = () => {
    const winningNumbers = Array.from(
      this.$form.querySelectorAll(".winning-number")
    ).map((el) => Number(el.value));

    const bonusNumber = Number(this.$form.querySelector(".bonus-number").value);

    if (isWinningBonusNumberDuplicated([...winningNumbers, bonusNumber])) {
      alert(ERROR_MESSAGES.DUPLICATED_NUMBERS);
      return;
    }

    this.onSubmit(winningNumbers, bonusNumber);
  };

  render() {
    for (const [key, value] of Object.entries(
      this.state.lottoWinNumberCountMap
    )) {
      this.$modal.getElementsByClassName(
        `winning-count-${key}`
      )[0].textContent = value;
    }

    this.$profitRateSpan.textContent = this.state.lottoProfitRate;

    if (this.state.modalOpened) {
      this.$modal.classList.add("open");
    } else {
      this.$modal.classList.remove("open");
    }
  }

  handleModalClose = () => {
    this.setState({
      modalOpened: false,
    });
  };
}
