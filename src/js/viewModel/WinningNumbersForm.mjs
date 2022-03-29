import WinningNumber from "../model/WinningNumber.mjs";

export default class WinningNumberForm {
  #numberInput;

  #bonusNumberForm;

  #numbersInput;

  #statisticsModal;

  #user;
  constructor($modal, user) {
    this.#statisticsModal = $modal;
    this.#user = user;
    this.#numberInput = document.querySelector(".number-form");
    this.#numbersInput = Array.from(document.querySelectorAll(".winning-number"));
    this.#bonusNumberForm = document.querySelector(".bonus-number");

    this.#numberInput.addEventListener("submit", this.#handleSubmit);
    this.#numberInput.addEventListener("keyup", this.#handleKeyup);
  }

  reset() {
    this.#numbersInput.forEach(el => el.reset())
    this.#bonusNumberForm.reset();
  }

  #handleSubmit = (e) => {
    e.preventDefault();
    if (!this.#user.haveLotto) {
      alert('먼저 로또를 구매해주세요')
      return ;
    }

    const winningNumbers = new WinningNumber();

    this.#numbersInput.map(({valueAsNumber}) => winningNumbers.addNumber(valueAsNumber));
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
    const isMaxLength = value.length === 2;
    const isWinningNumber = target.classList.contains("winning-number");
    
    if (isWinningNumber && isMaxLength) {
      (target.nextElementSibling ? target.nextElementSibling : this.#bonusNumberForm).focus();
    }
  };
}
