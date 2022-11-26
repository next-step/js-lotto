class ConfirmButton {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$submitButton = $target.querySelector('[data-id=lotto-submit-button]');
    this.render();
    this.addEventListener();
  }

  render() {
    const isBlank =
      this.props.state.moneyAmount === 0 ||
      this.props.state.moneyAmount === null;

    if (isBlank) this.$submitButton.setAttribute('disabled', '');
    if (!isBlank) this.$submitButton.removeAttribute('disabled');
  }

  addEventListener() {
    this.$target.addEventListener('click', (event) => {
      if (event.target.dataset.id === 'lotto-submit-button') {
        this.props.onConfirm();
      }
    });
  }
}

export default ConfirmButton;
