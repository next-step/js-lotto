class LottoPurchase {
  constructor(buyLotto) {
    this.buyButton = document.getElementById("buyButton");
    this.amountInput = document.getElementById("amountInput");

    this.buyButton.addEventListener("click", () => {
      const amount = this.amountInput.value;
      buyLotto(amount);
    });
  }
}

export default LottoPurchase;
