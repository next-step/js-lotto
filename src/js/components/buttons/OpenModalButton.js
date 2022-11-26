import { MAX_WINNING_INPUT_LENGTH } from '../../../constants.js';

class OpenModalButton {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$openModalButton = $target.querySelector(
      '[data-id=open-result-modal-button]'
    );
    this.render();
    this.addEventListener();
  }

  render() {
    const isValidBonusNumber = Boolean(this.props.state.bonusNumber);
    const isAllTyped =
      this.props.state.winningNumbers.filter((number) => Boolean(number))
        .length === MAX_WINNING_INPUT_LENGTH && isValidBonusNumber;
    const isValid = isAllTyped && isValidBonusNumber;

    if (isValid) this.$openModalButton.removeAttribute('disabled');
    if (!isValid) this.$openModalButton.setAttribute('disabled', '');
  }

  addEventListener() {
    this.$target.addEventListener('click', (event) => {
      if (event.target.dataset.id === 'open-result-modal-button') {
        event.preventDefault();
        this.props.onModalShow({ isVisibleModal: true });
      }
    });
  }
}

export default OpenModalButton;
