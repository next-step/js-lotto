import {
  isValidAmountUnit,
  isValidClickEventTarget,
  isValidSubmitEventTarget,
} from "./utils.js";
import {
  MESSAGE_ABOUT_DUPLICATION_NUMBER,
  MESSAGE_ABOUT_ENTERED_OUTSTANDING_AMOUNT,
  MESSAGE_ABOUT_UNIT_OF_AMOUNT,
} from "./constants.js";

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
        const hasManualLottos = this.#model.state.manualLottos.length > 0;
        const isValidManualLottoNumbers =
          this.#model.isValidManualLottoNumbers();
        const isValidAmount = this.#model.isValidAmount(
          Number(this.#view.$amountInput.value)
        );

        if (!isValidAmountUnit(this.#view.$amountInput.value)) {
          alert(MESSAGE_ABOUT_UNIT_OF_AMOUNT);
          return;
        }

        if (hasManualLottos && !isValidManualLottoNumbers) {
          alert(MESSAGE_ABOUT_DUPLICATION_NUMBER);
          return;
        }

        if (!isValidAmount) {
          alert(MESSAGE_ABOUT_ENTERED_OUTSTANDING_AMOUNT);
          return;
        }

        this.#model.purchaseLotto(Number(this.#view.$amountInput.value));
        this.render(this.#model.state);
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
