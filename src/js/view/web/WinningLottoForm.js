class WinningLottoForm {
  #$winningLottoForm;
  #winningLottoNumberInputs;
  #$bonusNumberInput;

  constructor($winningLottoForm, winningLottoNumberInputs, $bonusNumberInput) {
    this.#$winningLottoForm = $winningLottoForm;
    this.#winningLottoNumberInputs = winningLottoNumberInputs;
    this.#$bonusNumberInput = $bonusNumberInput;
  }

  get isValidWinningNumbers() {
    return Array.from(this.#winningLottoNumberInputs).every(
      (winningLottoNumberInput) => {
        return winningLottoNumberInput.validity.valid;
      }
    );
  }

  get isValidBonusNumber() {
    return this.#$bonusNumberInput.validity.valid;
  }

  get winningNumbers() {
    return Array.from(this.#winningLottoNumberInputs).map(
      (winningNumberInput) => winningNumberInput.value
    );
  }

  get bonusNumber() {
    return this.#$bonusNumberInput.value;
  }

  showWinningLottoForm() {
    this.#$winningLottoForm.classList.remove("d-none");
  }

  hideWinningLottoForm() {
    this.#$winningLottoForm.classList.add("d-none");
  }

  resetWinningLottoForm() {
    this.#winningLottoNumberInputs.forEach((winningNumberInput) => {
      winningNumberInput.value = "";
    });

    this.#$bonusNumberInput.value = "";
  }
}

export default WinningLottoForm;
