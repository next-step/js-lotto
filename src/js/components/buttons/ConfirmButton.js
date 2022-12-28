import { ELEMENT } from '../../../constants/elements.js';
class ConfirmButton {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$submitButton = $target.querySelector(ELEMENT.LOTTO_SUBMIT_BUTTON);
    this.render();
  }

  render() {
    const isBlank = this.props.state.moneyAmount === 0 || this.props.state.moneyAmount === null;

    if (isBlank) this.$submitButton.setAttribute('disabled', '');
    if (!isBlank) this.$submitButton.removeAttribute('disabled');
  }
}

export default ConfirmButton;
