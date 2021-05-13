import { $$ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constants.js";

// 지난주 당첨결과를 입력하는 컴포넌트

function LottoResult({ $target, onSubmitResult }) {
  this.$target = $target;
  this.onSubmitResult = onSubmitResult;

  this.bindEvents = () => {
    this.$target.addEventListener("submit", this.onSubmit);
  };

  this.onSubmit = (e) => {
    e.preventDefault();
    const winningNumbers = Array.from(
      $$(SELECTORS.LOTTO_WINNING_INPUT, this.$target)
    ).map((input) => +input.value);
    this.onSubmitResult(winningNumbers);
  };
  this.bindEvents();
}

export default LottoResult;
