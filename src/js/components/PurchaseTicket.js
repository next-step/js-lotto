import { subject } from '../index.js';
import { store } from '../store/state.js';

export default class PurchaseTicket extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    subject.subscribe(this);
  }

  disconnectedCallback() {
    subject.unsubscribe(this);
  }

  connectedCallback() {
    this.render();
  }

  getDetailElements() {
    const { isNumberVisible, tickets } = store.getState();
    const index = Number(this.getAttribute('index'));

    return isNumberVisible
      ? `<span class="lotto-detail" data-cy="lotto-numbers"
			>${tickets[index].join(', ')}</span>`
      : '';
  }

  init() {
    this.template.innerHTML = `
		<link rel="stylesheet" href="./src/css/index.css" />
		<div class='lotto-container'><span class="mx-1 text-4xl" data-cy="ticket-icon">🎟️ </span>
		<div class="lotto-details"></div>`;
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }

  render() {
    if (this.shadow.innerHTML === '') this.init();

    const lottoDetailElements = this.getDetailElements();
    const $tickets = this.shadow.querySelector('.lotto-details');
    $tickets.innerHTML = lottoDetailElements;
  }
}

customElements.define('purchase-ticket', PurchaseTicket);
