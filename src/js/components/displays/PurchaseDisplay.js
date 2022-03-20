export default class PurchaseDisplay {
  constructor({isConfirmBtnClicked}) {
    this.isVisible = null;
    this.setState(isConfirmBtnClicked);
  }

  setState(isConfirmBtnClicked) {
    this.isVisible = isConfirmBtnClicked;
    this.render();
  }

  render() {
    const $purchaseDisplayBox = document.querySelector('section');

    if (!this.isVisible) {
      $purchaseDisplayBox.innerHTML = '';
    }
  }
}