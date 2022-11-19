class PurchaseCount {
  constructor() {
    this.$purchaseCount = document.querySelector("#purchase-count");
  }

  render({ purchaseCount }) {
    this.$purchaseCount.innerHTML = purchaseCount;
  }
}

export default PurchaseCount;
