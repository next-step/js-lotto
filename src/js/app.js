import { MESSAGE_ABOUT_NOT_DEFINED_TYPE } from "./constants.js";
import { hasClass } from "./utils.js";

class App {
  #model;
  #view;

  constructor({ target, model, view }) {
    this.$target = document.querySelector(target);
    this.#model = model;
    this.#view = view;
    this.setEvent();
    this.handler = {
      "view-numbers-checkbox": (e) => {
        this.#view.onViewNumbers(e.target.checked);
      },
      modal: () => {
        if (!hasClass(this.#view.modal, "open")) {
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
  }

  onSubmit(form) {
    const submitHandlers = {
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

    return (
      submitHandlers[form]() ||
      (() => {
        alert(MESSAGE_ABOUT_NOT_DEFINED_TYPE);
        throw new Error(MESSAGE_ABOUT_NOT_DEFINED_TYPE);
      })
    );
  }

  onClick = (className) => (e) => {
    e.stopPropagation();
    return hasClass(e.target, className) && this.handler[className](e);
  };

  setEvent() {
    this.$target.addEventListener("submit", (e) => {
      e.preventDefault();

      this.onSubmit(e.target.id);
    });

    this.$target.addEventListener(
      "click",
      this.onClick("view-numbers-checkbox")
    );
    this.$target.addEventListener("click", this.onClick("modal"));
    this.$target.addEventListener("click", this.onClick("modal-close"));
    this.$target.addEventListener("click", this.onClick("reset-lotto-button"));
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
    this.#view.onCloseResultModal();
  }

  render(state) {
    this.#view.render(state);
  }

  reset() {
    this.#view.reset();
  }
}
export default App;
