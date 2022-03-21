export default class PurchaseDisplay {
  constructor({isConfirmBtnClicked, purchasedVal, onToggle}) {
    this.isVisible = null;
    this.purchasedVal = null;
    this.$lottoNumbersToggleBtn = null;
    this.$purchaseDisplayBox = document.querySelector('section');
    this.$purchasedResultText = document.getElementById('purchased-result-text');
    this.$purchasedTicketImgBox = document.getElementById('ticket-img-box');
    this.handleToggle = onToggle;
    this.setState(isConfirmBtnClicked, purchasedVal);
  }

  setState(isConfirmBtnClicked, purchasedVal) {
    this.isVisible = isConfirmBtnClicked;
    this.purchasedVal = purchasedVal;
    this.render();
  }

  showPurchaseDisplayInfo() {
    if (!this.isVisible) {
      this.$purchaseDisplayBox.style.display = 'none';
    } else {
      this.$purchaseDisplayBox.style.display = 'block';
      this.$purchasedResultText.textContent = `총 ${this.purchasedVal}개를 구매하였습니다.`;

      let ticketImages = '';

      for (let i = 0; i < this.purchasedVal; i++) {
        ticketImages += `<span class="mx-1 text-4xl">🎟️ </span>`;
      }
      this.$purchasedTicketImgBox.innerHTML = ticketImages;
    }
  }

  render() {
    this.showPurchaseDisplayInfo();

    const $lottoNumbersToggleBtn = document.querySelector('.lotto-numbers-toggle-button');
    this.$lottoNumbersToggleBtn = $lottoNumbersToggleBtn.cloneNode(true);
    $lottoNumbersToggleBtn.after(this.$lottoNumbersToggleBtn);
    $lottoNumbersToggleBtn.remove();

    this.addEvent(this.$lottoNumbersToggleBtn, 'click', this.handleToggle);
  }

  addEvent($el, event, callbackFn) {
    $el.addEventListener(event, callbackFn);
  }
}