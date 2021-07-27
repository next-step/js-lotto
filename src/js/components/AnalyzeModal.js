import { SELECTORS } from "../utils/constants.js";
import { lottoResultView } from "../utils/templates.js";
import { $ } from "../utils/dom.js";
import lottoCheck from "../utils/lottoCheck.js";

function AnalyzeModal({ initialState, modalCloseHandler }) {
  this.state = initialState;
  this.modalCloseHandler = modalCloseHandler;
  this.$target = $(SELECTORS.MODAL);
  this.$closeModalBtn = $(SELECTORS.MODAL_CLOSE);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.bindEvent = () => {
    this.$closeModalBtn.addEventListener("click", this.modalCloseHandler);
  };

  this.updateModalContents = () => {
    const { result, rate } = lottoCheck(
      this.state.lottoList,
      this.state.winningNumbers
    );
    $(SELECTORS.LOTTO_RESULT).innerHTML = lottoResultView(result);
    $(SELECTORS.PROFIT).innerText = `총 수익률은 ${rate}%입니다`;
  };

  this.render = () => {
    if (this.state.isModalOpen) {
      this.$target.classList.add("open");
      this.updateModalContents();
    } else this.$target.classList.remove("open");
  };

  this.render();
  this.bindEvent();
}

export default AnalyzeModal;
