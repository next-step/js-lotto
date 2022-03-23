import WinningNumber from "../model/WinningNumber.mjs";

export default class WinningNumberForm {
  #numberForm;

  #winningNumbers;

  #bonusNumberForm;
  constructor() {
    this.#numberForm = document.querySelector(".number-form");
    this.#bonusNumberForm = document.querySelector(".bonus-number");
    this.#winningNumbers = new WinningNumber();

    this.#numberForm.addEventListener("submit", this.#handleSubmit);
    this.#numberForm.addEventListener("keyup", this.#handleKeyup);
  }

  #handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 모달을 띄운다.
    // TODO: 현재입력한 번호와 이전에 입력한 로또번호를 전달한다.
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
