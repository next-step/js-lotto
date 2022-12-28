import { ELEMENT } from '../../../constants/elements.js';

class WinningNumberInput {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.$winningNumbersInput = Array.from($target.querySelectorAll(ELEMENT.WINNING_NUMBERS_INPUT));
    this.$bonusNumberInput = $target.querySelector(ELEMENT.BONUS_NUMBER_INPUT);

    this.render();
  }

  render() {
    this.$winningNumbersInput.forEach((element, index) => {
      element.value = this.props.state.winningNumbers[index];
    });

    this.$bonusNumberInput.value = this.props.state.bonusNumber;
  }
}
export default WinningNumberInput;
