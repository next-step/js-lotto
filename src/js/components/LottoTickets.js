class LottoTickets {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.render();
  }

  render() {
    this.$target
      .querySelectorAll('.lotto-number')
      .forEach((element) => (element.style.display = this.props.state.isToggle ? 'inline' : 'none'));
  }
}

export default LottoTickets;
