import { subject } from '../index.js';
import { getState } from '../store/state.js';

export default class PurchaseTicket extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    subject.subscribe(this);
    this.index = Number(this.getAttribute('index'));
  }

  onStateChange() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { isNumberVisible, tickets } = getState();

    const lottoNumberElements =
      isNumberVisible === true
        ? `<span class="lotto-detail" data-cy='lotto-numbers'>${tickets[this.index].join(
            ', ',
          )}</span>`
        : '';
    this.shadow.innerHTML = `
			${style}
			<div class='lotto-container'><span class="mx-1 text-4xl" data-cy="ticket-icon">🎟️ </span>
			${lottoNumberElements}`;
  }
}
const style = `
	<style>
		.d-flex {
				display: flex;
		}
		.lotto-container {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.lotto-container span {
				display: block;
				margin-right: 20px;
		}
		.mx-1 {
				margin-left: 0.25rem;
				margin-right: 0.25rem;
		}
		.lotto-detail {
				font-size: 1.25rem;
		}
		.text-4xl {
				font-size: 2.25rem;
				line-height: 2.5rem;
		}
	</style>
`;
customElements.define('purchase-ticket', PurchaseTicket);
