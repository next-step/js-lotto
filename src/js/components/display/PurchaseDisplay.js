export default class PurchaseDisplay {
  constructor({isEnterBtnClicked}) {
    this.isVisible = null;
    this.setState(isEnterBtnClicked);
  }

  setState(isEnterBtnClicked) {
    this.isVisible = isEnterBtnClicked;
    this.render();
  }

  render() {
    const $purchaseDisplayBox = document.querySelector('section');

    if (!this.isVisible) {
      $purchaseDisplayBox.innerHTML = '';
    }
  }
}