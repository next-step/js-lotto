import WinningNumber from "../model/WinningNumber.mjs";

export default class WinningNumberForm {
  #numberForm;

  #bonusNumberForm;

  #numbersForm;

  #modal;

  #user;
  constructor($modal, user) {
    this.#modal = $modal;
    this.#user = user;
    this.#numberForm = document.querySelector(".number-form");
    this.#numbersForm = Array.from(document.querySelectorAll(".winning-number"));
    this.#bonusNumberForm = document.querySelector(".bonus-number");

    this.#numberForm.addEventListener("submit", this.#handleSubmit);
    this.#numberForm.addEventListener("keyup", this.#handleKeyup);
  }

  #handleSubmit = (e) => {
    e.preventDefault();

    const winningNumbers = new WinningNumber();

    this.#numbersForm.map(({valueAsNumber}) => winningNumbers.addNumber(valueAsNumber))
    winningNumbers.bonusNumber = this.#bonusNumberForm.valueAsNumber;

    if (winningNumbers.isValid()) {
      this.#modal.openModal(winningNumbers, this.#user);
      return;
    }
    alert('당첨번호가 올바르지 않습니다.')
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
