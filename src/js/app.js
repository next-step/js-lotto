import { isValidClickEventTarget, isValidSubmitEventTarget } from "./utils.js";

class App {
  #model;
  #view;

  constructor({ target, model, view }) {
    this.$target = document.querySelector(target);
    this.#model = model;
    this.#view = view;

    this.clickHandler = {
      "view-numbers-checkbox": (e) => {
        this.#view.onViewNumbers(e.target.checked);
      },
      modal: () => {
        if (!this.#view.isResultModalOpened) {
          this.openModal();
        } else {
          this.closeModal();
        }
      },
      "modal-close": () => {
        this.closeModal();
      },
      "reset-lotto-button": () => {
        this.reset();
      },
    };
    this.submitHandler = {
      "purchase-input-form": () => {
        const isValid = this.#model.purchaseLotto(
          this.#view.$amountInput.value
        );

        if (!isValid) return;

        this.render(this.#model.state);
      },
      "winning-number-confirmation-form": () => {
        const isValidNumbers = this.#model.isValidNumbers(
          this.#view.$winningInputs,
          this.#view.$bonusInput
        );

        if (!isValidNumbers) return;

        this.openModal();
      },
    };

    this.setEvent();
  }

  handledSubmit = (e) => {
    e.preventDefault();
    if (!isValidSubmitEventTarget(e.target)) return;
    this.submitHandler[e.target.id]();
  };

  handledClick = (e) => {
    if (!isValidClickEventTarget(e.target)) return;
    e.stopPropagation();

    this.clickHandler[e.target.id](e);
  };

  setEvent() {
    this.$target.addEventListener("submit", this.handledSubmit);
    this.$target.addEventListener("click", this.handledClick);
  }

  openModal() {
    this.#model.checkWinnerNumber(
      this.#view.$winningInputs,
      this.#view.$bonusInput
    );
    this.#view.renderModal(
      this.#model.state.winningStatistics,
      this.#view.$amountInput.value
    );
  }

  closeModal() {
    this.#view.handledCloseResultModal();
  }

  render(state) {
    this.#view.render(state);
  }

  reset() {
    this.#view.reset();
  }
}
export default App;
