class LottoTicketView {
  constructor({ $target, lottoTicketList }) {
    this.$target = $target;
    this.lottoTicketList = lottoTicketList;
    this.init();
  }
  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = this.makeTemplate();
  }

  makeTemplate() {
    const template = this.lottoTicketList
      .map(ticket => ticket.getNumbers())
      .reduce((acc, cur) => {
        return (
          acc +
          `<li><span class="mx-1 text-4xl">🎟️ </span><span class="lotto-detail">${cur.join(
            ", "
          )}</span></li>`
        );
      }, "");

    return template;
  }
}

export default LottoTicketView;
