// import { getState } from '../store/state.js';
import { store } from '../store/state.js';
import { toggleShowNumbers } from '../store/actions.js';
import { subject } from '../index.js';

export default class PurchaseTickets extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    subject.subscribe(this);
  }

  setEvent() {
    this.shadow.addEventListener('change', event => {
      if (event.target.type !== 'checkbox') return;
      toggleShowNumbers(event.target.checked);
    });
  }

  disconnectedCallback() {
    subject.unsubscribe(this);
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  getTicketElement(ticketCount) {
    return new Array(ticketCount)
      .fill('')
      .map((element, index) => `<purchase-ticket index="${index}"></purchase-ticket>`)
      .join('');
  }

  init() {
    this.template.innerHTML = ` 
		<link rel="stylesheet" href="./src/css/index.css" />
      <section class="mt-9">
        <div class="d-flex">
          <label class="flex-auto my-0"
            >총 <span data-cy="total-purchase"></span>개를 구매하였습니다.</label
          >
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input
                type="checkbox"
                class="lotto-numbers-toggle-button"
                data-cy="toggle-number-button"
              />
              <span class="text-base font-normal">번호보기</span>
            </label>
          </div>
        </div>
        <div class="d-flex flex-wrap tickets"></div>
      </section>`;

    this.shadow.appendChild(this.template.content.cloneNode(true));
  }

  render() {
    const { ticketCount } = store.getState();
    if (ticketCount === 0) {
      this.shadow.innerHTML = '';
      return;
    }
    if (this.shadow.innerHTML === '') this.init();

    const $total = this.shadow.querySelector('span[data-cy="total-purchase"]');
    $total.innerHTML = ticketCount;
    const ticketElements = this.getTicketElement(ticketCount);
    const $tickets = this.shadow.querySelector('.tickets');
    $tickets.innerHTML = ticketElements;
  }
}

customElements.define('purchase-tickets', PurchaseTickets);
