class PurchaseAmountInputForm {
  #$purchaseAmountInput;

  constructor($purchaseAmountInput, $purchaseButton, onSubmit) {
    this.#$purchaseAmountInput = $purchaseAmountInput;
    $purchaseAmountInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        onSubmit();
        e.preventDefault();
      }
    });
    $purchaseButton.addEventListener("click", onSubmit);
  }

  get inputValue() {
    return this.#$purchaseAmountInput.value;
  }

  clearInput() {
    this.#$purchaseAmountInput.value = "";
  }
}

export default PurchaseAmountInputForm;
