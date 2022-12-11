import {
  checkValidAmountUnit,
  isValidClickEventTarget,
  isValidSubmitEventTarget,
  ValidationError,
} from "./utils.js";

class App {
  #model;
  #view;

  constructor({ target, model, view }) {
    this.$target = document.querySelector(target);
    this.#model = model;
    this.#view = view;

    this.clickHandler = {
      "create-manual-lotto-button": () => {
        this.#view.addManualLotto();
        this.#model.createManualLotto();
      },
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
        try {
          this.validationCheckForSubmit();
          this.#model.purchaseLotto(Number(this.#view.$amountInput.value));
          this.render(this.#model.state);
        } catch (error) {
          if (error instanceof ValidationError) {
            alert(error.message);
          } else {
            throw error;
          }
        }
      },
      "winning-number-confirmation-form": () => {
        const isValidWinningNumbers = this.#model.isValidWinningNumbers(
          this.#view.$winningInputs,
          this.#view.$bonusInput
        );

        if (!isValidWinningNumbers) return;

        this.#model.checkWinnerNumber(
          this.#view.$winningInputs,
          this.#view.$bonusInput
        );

        this.openModal();
      },
    };

    this.setEvent();
  }

  validationCheckForSubmit() {
    checkValidAmountUnit(this.#view.$amountInput.value);
    this.#model.checkValidManualLottoNumbers();
    this.#model.checkValidAmount(Number(this.#view.$amountInput.value));
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

  handledKeyup = (e) => {
    const { value, parentElement: $parentLiElement, classList } = e.target;
    const isManualInput = classList.contains("manual-number");
    const lottoIndex = Number($parentLiElement.getAttribute("index"));

    const numberIndex = Array.from($parentLiElement.children).indexOf(e.target);

    if (!isManualInput) return;

    this.#model.onInputManualLottoNumber({
      value: Number(value),
      lottoIndex,
      numberIndex,
    });
  };

  setEvent() {
    this.$target.addEventListener("submit", this.handledSubmit);
    this.$target.addEventListener("click", this.handledClick);
    this.$target.addEventListener("keyup", this.handledKeyup);
  }

  openModal() {
    this.#view.renderModal(this.#model.state.winningStatistics);
  }

  closeModal() {
    this.#view.handledCloseResultModal();
  }

  render(state) {
    this.#view.render(state);
  }

  reset() {
    this.#view.reset();
    this.#model.reset();
  }
}
export default App;
