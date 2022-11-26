class LottoTickets {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.addEventListener();
  }

  render() {
    this.$target
      .querySelectorAll('.lotto-number')
      .forEach(
        (element) =>
          (element.style.display = this.props.state.isToggle
            ? 'inline'
            : 'none')
      );
  }

  addEventListener() {}
}

export default LottoTickets;
