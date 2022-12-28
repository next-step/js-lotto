import { CLICK_EVENT_MAP, ELEMENT_DATA_ID, ELEMENT_DATA_ID_FORM } from '../../../constants/elements.js';
class ConfirmButton {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$submitButton = $target.querySelector(ELEMENT_DATA_ID_FORM.LOTTO_SUBMIT_BUTTON);
    this.render();
    this.addEventListener();
  }

  render() {
    const isBlank = this.props.state.moneyAmount === 0 || this.props.state.moneyAmount === null;

    if (isBlank) this.$submitButton.setAttribute('disabled', '');
    if (!isBlank) this.$submitButton.removeAttribute('disabled');
  }

  addEventListener() {
    CLICK_EVENT_MAP.set(ELEMENT_DATA_ID.LOTTO_SUBMIT_BUTTON, this.props.onConfirm);
  }
}

export default ConfirmButton;
