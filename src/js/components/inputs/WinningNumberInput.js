export default class WinningNumberInput {
  constructor({isConfirmBtnClicked}) {
    this.isVisible = null;
    this.setState(isConfirmBtnClicked);
  }

  setState(isConfirmBtnClicked) {
    this.isVisible = isConfirmBtnClicked;
    this.render();
  }

  render() {
    const $winningNumberInputBox = document.querySelector('#winning-number-input-form');

    if(!this.isVisible) {
      $winningNumberInputBox.style.display = "none";
    } else {
      $winningNumberInputBox.style.display = "block";
    }
  }
}