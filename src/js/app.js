import { MESSAGE_ABOUT_NOT_DEFINED_TYPE } from "./constants.js";

class App {
  #model;
  #view;
  constructor({ target, model, view }) {
    this.$target = document.querySelector(target);
    this.$amountInput = document.querySelector("#purchase-amount-input");
    this.$winningInputs = document.querySelectorAll(".winning-number");
    this.$bonusInput = document.querySelectorAll(".bonus-number");
    this.#model = model;
    this.#view = view;
    this.setEvent();
  }

  onSubmit(form) {
    const submitHandlers = {
      "purchase-input-form": () => {
        this.#model.purchaseLotto(this.$amountInput.value);
        this.render(this.#model.state);
      },
      "winning-number-confirmation-form": () => {
        this.#model.checkResult(this.$winningInputs);
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

  render(state) {
    this.#view.render(state);
  }

  setEvent() {
    this.$target.addEventListener("submit", (e) => {
      e.preventDefault();

      this.onSubmit(e.target.id);
    });

    this.$target.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.classList.contains("view-numbers-checkbox"))
        this.#view.onViewNumbers(e.target.checked);
    });
  }
}
export default App;
