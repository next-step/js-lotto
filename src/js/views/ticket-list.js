export default class TicketList {
  selector;

  constructor(lottoState) {
    this.lottoState = lottoState;
    this.lottoState.subscribe(this.onStateChanged);
    this.selector = {
      resultWrap: document.querySelector('.result-wrap'),
      totalMessage: document.querySelector('.message-purchase-total'),
      btnViewNumber: document.querySelector('.btn-toggle-numbers'),
      ticketList: document.querySelector('.ticket-list'),
    };

    this.setEventHandler();
  }

  onStateChanged = (state) => {
    if (!state?.length) {
      return;
    }

    this.setTemplate(state);
    this.setTickets(state);
  };

  setTemplate(lottos) {
    if (this.selector.btnViewNumber.checked) {
      this.selector.btnViewNumber.checked = false;
      this.toggleViewNumbers();
    }

    this.selector.resultWrap.classList.remove('hide');
    this.selector.totalMessage.innerHTML = `총 ${lottos.length}개를 구매하였습니다.`;
  }

  setTickets(lottos) {
    let template = '';

    lottos.forEach(item => {
      template += `<li><span class="mx-1 text-4xl">🎟️</span><span class="numbers">${item.join(', ')}</span></li>`;
    });

    this.selector.ticketList.innerHTML = template;
  }

  setEventHandler() {
    this.selector.btnViewNumber.addEventListener('click', this.toggleViewNumbers);
  }

  toggleViewNumbers = () => {
    this.selector.ticketList.classList.toggle('view-numbers');
  };
}
