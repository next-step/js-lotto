import { ELEMENT } from '../../../constants/elements.js';
import { LOTTO_VALUE } from '../../../constants/validation.js';
class OpenModalButton {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$openModalButton = $target.querySelector(ELEMENT.OPEN_RESULT_MODAL_BUTTON);
    this.render();
  }

  render() {
    const isValidBonusNumber = Boolean(this.props.state.bonusNumber);
    const isAllTyped =
      this.props.state.winningNumbers.filter((number) => Boolean(number)).length === LOTTO_VALUE.MAX_LOTTO_COUNT &&
      isValidBonusNumber;
    const isValid = isAllTyped && isValidBonusNumber;

    if (isValid) this.$openModalButton.removeAttribute('disabled');
    if (!isValid) this.$openModalButton.setAttribute('disabled', '');
  }
}

export default OpenModalButton;
