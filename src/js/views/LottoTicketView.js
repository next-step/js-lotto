import View from "./View.js";
class LottoTicketView extends View {
  makeTemplate() {
    const { lottoTicketList, quantity } = this.props;
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

    return `<div class="d-flex" id="summary-container">
    <label class="flex-auto my-0">총 <span id="quantity-text">${quantity}</span>개를 구매하였습니다.</label> 
    <div class="flex-auto d-flex justify-end pr-1">
    <label class="switch">
      <input type="checkbox" class="lotto-numbers-toggle-button" />
      <span class="text-base font-normal">번호보기</span>
    </label>
    </div>
    </div><ul class="d-flex flex-wrap" id="lotto-icons">${template}</ul>`;
  }
}

export default LottoTicketView;
