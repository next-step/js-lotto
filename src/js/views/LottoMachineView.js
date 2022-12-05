class LottoMachineView {
  constructor() {
    this.$purchaseForm = document.getElementById("purchase-form");
    this.$purchaseAmountInput = document.getElementById(
      "purchase-amount-input"
    );
    this.$lastWinningNumbersForm = document.getElementById(
      "last-winning-numbers-form"
    );
  }

  clear() {
    this.$lastWinningNumbersForm.classList.add("hide");
    this.$purchaseForm.reset();
    this.$lastWinningNumbersForm.reset();
  }

  showElement($element) {
    $element.classList.remove("hide");
  }
}
export default LottoMachineView;
