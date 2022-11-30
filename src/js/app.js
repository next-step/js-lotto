import { MESSAGE_ABOUT_NOT_DEFINED_TYPE } from "./constants.js";
import { hasClass } from "./utils.js";

class App {
  #model;
  #view;

  constructor({ target, model, view }) {
    this.$target = document.querySelector(target);
    this.$amountInput = document.querySelector("#purchase-amount-input");
    this.$winningInputs = document.querySelectorAll(".winning-number");
    this.$bonusInput = document.querySelector(".bonus-number");
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
          this.#view.onCloseResultModal();
        }
      },
      "modal-close": () => {
        this.#view.onCloseResultModal();
      },
    };
  }

  onSubmit(form) {
    const submitHandlers = {
      "purchase-input-form": () => {
        this.#model.purchaseLotto(this.$amountInput.value);
        this.render(this.#model.state);
      },
      "winning-number-confirmation-form": () => {
        const isValidNumbers = this.#model.isValidNumbers(
          this.$winningInputs,
          this.$bonusInput
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
  }

  openModal() {
    this.#model.checkWinnerNumber(this.$winningInputs, this.$bonusInput);
    this.#view.renderModal(this.#model.state.winningStatistics);
  }

  render(state) {
    this.#view.render(state);
  }
}
export default App;
