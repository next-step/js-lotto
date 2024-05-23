class PurchaseAmountInputForm {
  #$purchaseAmountInput;

  constructor($purchaseAmountInput, $purchaseButton, onSubmit) {
    this.#$purchaseAmountInput = $purchaseAmountInput;
    $purchaseAmountInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (!this.isValidInput) {
          return;
        }
        onSubmit(e);
      }
    });
    $purchaseButton.addEventListener("click", onSubmit);
  }

  get isValidInput() {
    return this.#$purchaseAmountInput.validity.valid;
  }

  get inputValue() {
    return this.#$purchaseAmountInput.value;
  }

  clearInput() {
    this.#$purchaseAmountInput.value = "";
  }
}

export default PurchaseAmountInputForm;
