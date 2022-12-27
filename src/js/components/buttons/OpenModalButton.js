import { CLICK_EVENT_MAP, ELEMENT_DATA_ID, ELEMENT_DATA_ID_FORM, LOTTO_VALUE } from '../../../constants.js';

class OpenModalButton {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$openModalButton = $target.querySelector(ELEMENT_DATA_ID_FORM.OPEN_RESULT_MODAL_BUTTON);
    this.render();
    this.addEventListener();
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

  addEventListener() {
    CLICK_EVENT_MAP.set(ELEMENT_DATA_ID.OPEN_RESULT_MODAL_BUTTON, (event) => {
      event.preventDefault();
      this.props.onModalShow({ isVisibleModal: true });
    });
  }
}

export default OpenModalButton;
