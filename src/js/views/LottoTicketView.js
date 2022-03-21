import View from "../core/View.js";
class LottoTicketView extends View {
  makeTemplate() {
    const { lottoTicketList } = this.props;
    const template = lottoTicketList
      .map(ticket => ticket.getNumbers())
      .reduce((acc, cur) => {
        return (
          acc +
          `<li class="ticket-list"><span class="mx-1 text-4xl">🎟️ </span><span class="lotto-detail hidden">${cur.join(
            ", "
          )}</span></li>`
        );
      }, "");

    return template;
  }
}

export default LottoTicketView;
