class LottoTickets {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;
    this.$lottoNumbers = this.$target.querySelectorAll('.lotto-number');
    this.render();
  }

  render() {
    this.$lottoNumbers.forEach((element) => (element.style.display = this.props.state.isToggle ? 'inline' : 'none'));
  }
}

export default LottoTickets;
