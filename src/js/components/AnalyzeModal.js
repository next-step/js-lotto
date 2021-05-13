import { SELECTORS } from "../utils/constants.js";
import { lottoResultView } from "../utils/templates.js";
import { $ } from "../utils/dom.js";

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
    const table = new Map();
    // winning Numbers 와 일일이 비교한 결과 렌더링
    // 수익율 렌더링
    $(SELECTORS.LOTTO_RESULT).innerHTML = "";
    $(SELECTORS.PROFIT).innerText = "";
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
