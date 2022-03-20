export default class PurchaseDisplay {
  constructor({isConfirmBtnClicked, purchasedVal}) {
    this.isVisible = null;
    this.purchasedVal = null;
    this.$purchaseDisplayBox = null;
    this.setState(isConfirmBtnClicked, purchasedVal);
  }

  setState(isConfirmBtnClicked, purchasedVal) {
    this.isVisible = isConfirmBtnClicked;
    this.purchasedVal = purchasedVal;
    this.render();
  }

  render() {
    const $purchaseDisplayBox = document.querySelector('section');
    // this.$purchaseDisplayBox = $purchaseDisplayBox.cloneNode(true);

    if (!this.isVisible) {
      $purchaseDisplayBox.style.display = 'none';
    } else {
      $purchaseDisplayBox.style.display = 'block';

      const $purchasedResultText = document.getElementById('purchased-result-text');
      const $purchasedTicketImgBox = document.getElementById('ticket-img-box');


      $purchasedResultText.textContent = `총 ${this.purchasedVal}개를 구매하였습니다.`;

      let ticketImages = '';
      for (let i = 0; i < this.purchasedVal; i++) {
        ticketImages += `<span class="mx-1 text-4xl">🎟️ </span>`;
      }
      $purchasedTicketImgBox.innerHTML = ticketImages;
    }
  }
}