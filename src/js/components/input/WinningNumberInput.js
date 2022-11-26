class WinningNumberInput {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.$winningNumbersInput = Array.from(
      $target.getElementsByClassName('winning-number')
    );
    this.$bonusNumberInput = $target.querySelector('.bonus-number');
    this.render();
    this.addEventListener();
  }

  render() {
    this.$winningNumbersInput.forEach((element, index) => {
      element.value = this.props.state.winningNumbers[index];
    });

    this.$bonusNumberInput.value = this.props.state.bonusNumber;
  }

  addEventListener() {}
}
export default WinningNumberInput;
