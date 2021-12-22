import {$} from "../modules/utils.js";
import Component from "../lib/Component.js";

export default class Tickets extends Component {
  setup() {
    this.onToggle = this.onToggle.bind(this);
  }

  template() {
    const {lottoNumbers} = this.props;
    const eleLottoTicket = '<span class="mx-1 text-4xl">🎟️ </span>';
    const eleLottoTicketAndNumbers = numbers => `<div class="mx-1 text-4xl d-flex items-center">🎟️ <span class="mx-3 text-xl">${numbers.join(', ')}</span></div>`;

    return `
      <section class="mt-9">
        <div class="d-flex">
          <label class="flex-auto my-0">총 <span id="purchaseAmount">${lottoNumbers.length}</span>개를 구매하였습니다.</label>
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input type="checkbox" class="lotto-numbers-toggle-button""/>
              <span class="text-base font-normal">번호보기</span>
            </label>
          </div>
        </div>
        <div id="lottoTickets" class="ticket d-flex flex-wrap show">
            ${lottoNumbers.reduce((lottos, lottoNumber) => {
              lottos += eleLottoTicket
              return lottos
            }, '')}
        </div>
        <div id="lottoTicketsAndNumbers" class="ticket d-flex flex-wrap">
            ${lottoNumbers.reduce((lottos, lottoNumber) => {
              lottos += eleLottoTicketAndNumbers(lottoNumber)
              return lottos
            }, '')}
        </div>
      </section>
    `;
  }
  mounted() {
    this.$lottoTickets = $('#lottoTickets');
    this.$lottoTicketsAndNumbers = $('#lottoTicketsAndNumbers');
    $('.lotto-numbers-toggle-button').addEventListener('click', this.onToggle)
  }
  onToggle(eve) {
    if(eve.target.checked === true) {
      this.$lottoTickets.classList.remove('show');
      this.$lottoTicketsAndNumbers.classList.add('show');
    } else {
      this.$lottoTicketsAndNumbers.classList.remove('show');
      this.$lottoTickets.classList.add('show');
    }
  }

}