import { SELECTORS } from "../utils/constants.js";
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

  this.render = () => {
    if (this.state.isModalOpen) this.$target.classList.add("open");
    else this.$target.classList.remove("open");
  };
  this.render();
  this.bindEvent();
}

export default AnalyzeModal;
