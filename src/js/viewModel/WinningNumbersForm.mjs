import WinningNumber from "../model/WinningNumber.mjs";

export default class WinningNumberForm {
  #numberForm;

  #bonusNumberForm;

  #numbersForm;

  #statisticsModal;

  #user;
  constructor($modal, user) {
    this.#statisticsModal = $modal;
    this.#user = user;
    this.#numberForm = document.querySelector(".number-form");
    this.#numbersForm = Array.from(document.querySelectorAll(".winning-number"));
    this.#bonusNumberForm = document.querySelector(".bonus-number");

    this.#numberForm.addEventListener("submit", this.#handleSubmit);
    this.#numberForm.addEventListener("keyup", this.#handleKeyup);
  }

  reset() {
    this.#numbersForm.forEach(el => el.reset())
    this.#bonusNumberForm.reset();
  }

  #handleSubmit = (e) => {
    e.preventDefault();
    if (!this.#user.haveLotto) {
      alert('먼저 로또를 구매해주세요')
      return ;
    }

    const winningNumbers = new WinningNumber();

    this.#numbersForm.map(({valueAsNumber}) => winningNumbers.addNumber(valueAsNumber));
    winningNumbers.bonusNumber = this.#bonusNumberForm.valueAsNumber;

    try {
      if (winningNumbers.isValid()) {
        this.#statisticsModal.openModal(winningNumbers, this.#user);
        return;
      }
    } catch (e) {
      alert(e.message)
    }
  };

  /**
   * @param {KeyboardEvent} e
   */
  #handleKeyup = ({ target }) => {
    const { value } = target;
    if (
      target.classList.contains("winning-number") &&
      value.length === 2
    ) {
      (target.nextElementSibling ? target.nextElementSibling : this.#bonusNumberForm).focus();
    }
  };
}
