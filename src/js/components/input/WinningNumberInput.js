export default class WinningNumberInput {
  constructor({isEnterBtnClicked}) {
    this.isVisible = null;
    this.setState(isEnterBtnClicked);
  }

  setState(isEnterBtnClicked) {
    this.isVisible = isEnterBtnClicked;
    this.render();
  }

  render() {
    const $winningNumberInputBox = document.querySelector('#winning-number-input-form');

    if(!this.isVisible) {
      $winningNumberInputBox.style.display = "none";
    }
  }
}