export default class PurchaseDisplay {
  constructor({isConfirmBtnClicked, isToggleBtnClicked, purchasedVal, randomNumberSet, onToggle}) {
    this.isVisible = null;
    this.isToggleBtnClicked = null;
    this.purchasedVal = null;
    this.randomNumberSet = [];
    this.$lottoNumbersToggleBtn = null;
    this.$purchaseDisplayBox = document.querySelector('section');
    this.$purchasedResultText = document.getElementById('purchased-result-text');
    this.$purchasedTicketImgBox = document.getElementById('ticket-img-box');
    this.handleToggle = onToggle;
    this.setState(isConfirmBtnClicked, isToggleBtnClicked, purchasedVal, randomNumberSet);
  }

  setState(isConfirmBtnClicked, isToggleBtnClicked, purchasedVal, randomNumberSet) {
    this.isVisible = isConfirmBtnClicked;
    this.isToggleBtnClicked = isToggleBtnClicked;
    this.purchasedVal = purchasedVal;
    this.randomNumberSet = randomNumberSet
    this.render();
  }

  showPurchaseDisplayInfo() {
    if (!this.isVisible) {
      this.$purchaseDisplayBox.style.display = 'none';
    } else {
      this.$purchaseDisplayBox.style.display = 'block';
      this.$purchasedResultText.textContent = `총 ${this.purchasedVal}개를 구매하였습니다.`;
    }
  }

  showRandomNumbers() {
    let ticketImages = '';

    if (this.isToggleBtnClicked) {
      let ticketAndNumbers = ``

      this.randomNumberSet.forEach(sixRandomNums => {
        let numbers = '';

        sixRandomNums.forEach(num => {
          numbers += `<span class="mx-1 text-xl">${num},</span>`;
        })
        ticketAndNumbers += `<span class="mx-1 text-4xl">🎟️${numbers} </span>`
      })
      ticketImages = ticketAndNumbers;
    } else {
      for (let i = 0; i < this.purchasedVal; i++) {
        ticketImages += `<span class="mx-1 text-4xl">🎟️ </span>`;
      }
    }

    this.$purchasedTicketImgBox.innerHTML = ticketImages;
  }

  render() {
    this.showPurchaseDisplayInfo();
    this.showRandomNumbers();

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