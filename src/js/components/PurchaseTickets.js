import { getState } from '../store/state.js';
import { toggleShowNumbers } from '../store/actions.js';
import { subject } from '../index.js';

export default class PurchaseTickets extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    subject.subscribe(this);
  }

  onStateChange() {
    this.render();
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

  render() {
    const { ticketCount, isNumberVisible } = getState();

    const ticketElements = new Array(ticketCount)
      .fill('')
      .map((element, index) => `<purchase-ticket index="${index}"></purchase-ticket>`)
      .join('');

    this.shadow.innerHTML =
      ticketCount > 0
        ? `
				${style}
				<section class="mt-9">
    		<div class="d-flex">
    			<label class="flex-auto my-0"
    				>총 <span data-cy="total-purchase">${ticketCount}</span>개를
    				구매하였습니다.</label>
    			<div class="flex-auto d-flex justify-end pr-1">
    				<label class="switch">
    					<input type="checkbox" class="lotto-numbers-toggle-button" data-cy="toggle-number-button" ${
                isNumberVisible === true ? 'checked' : ''
              } />
    					<span class="text-base font-normal">번호보기</span>
    				</label>
    			</div>
    		</div>
    		<div class="d-flex flex-wrap">
    		${ticketElements}
    		</div>
    	</section>
    	`
        : '';
  }
}

const style = `<style>
	section {
		display: block;
	}
	.mt-9 {
		margin-top: 2.25rem;
	}
	.d-flex {
		display: flex;
	}
	.flex-wrap {
		flex-wrap: wrap;
	}
	.flex-auto {
		flex: 1 1 auto;
	}
	.pr-1 {
		padding-right: 0.25rem;
	}
	.justify-end {
		justify-content: flex-end;
	}
	.switch > span {
		display: inline-block;
		width: 100%;
		cursor: pointer;
	}
	.font-normal {
		font-weight: 400;
	}
	.text-base {
		font-size: 1rem;
		line-height: 1.5rem;
	}
	.switch {
		z-index: 0;
		position: relative;
	}

	.switch > input {
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		z-index: -1;
		position: absolute;
		right: 6px;
		top: -8px;
		display: block;
		margin: 0;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		outline: none;
		opacity: 0;
		transform: scale(1);
		pointer-events: none;
		transition: opacity 0.3s 0.1s, transform 0.2s 0.1s;
	}

	/* Span */
	.switch > span {
		display: inline-block;
		width: 100%;
		cursor: pointer;
	}

	/* Track */
	.switch > span::before {
		content: '';
		float: right;
		display: inline-block;
		margin: 5px 0 5px 10px;
		border-radius: 7px;
		width: 36px;
		height: 14px;
		background-color: rgba(0, 0, 0, 0.38);
		vertical-align: top;
		transition: background-color 0.2s, opacity 0.2s;
	}

	.switch > span::after {
		content: '';
		position: absolute;
		top: 2px;
		right: 16px;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		background-color: white;
		box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
			0 1px 5px 0 rgba(0, 0, 0, 0.12);
		transition: background-color 0.2s, transform 0.2s;
	}

	.switch > input:checked {
		right: -10px;
		background-color: rgb(0, 188, 212);
	}

	.switch > input:checked + span::before {
		background-color: rgba(0, 188, 212, 0.6);
	}

	.switch > input:checked + span::after {
		background-color: rgb(0, 188, 212);
		transform: translateX(16px);
	}

	/* Hover, Focus */
	.switch:hover > input {
		opacity: 0.04;
	}

	.switch > input:focus {
		opacity: 0.12;
	}

	.switch:hover > input:focus {
		opacity: 0.16;
	}

	.switch > input:active {
		opacity: 1;
		transform: scale(0);
		transition: transform 0s, opacity 0s;
	}

	.switch > input:active + span::before {
		background-color: rgba(0, 188, 212, 0.6);
	}

	.switch > input:checked:active + span::before {
		background-color: rgba(0, 0, 0, 0.38);
	}

	.switch > input:disabled {
		opacity: 0;
	}

	.switch > input:disabled + span {
		color: black;
		opacity: 0.38;
		cursor: default;
	}

	.switch > input:disabled + span::before {
		background-color: rgba(0, 0, 0, 0.38);
	}

	.switch > input:checked:disabled + span::before {
		background-color: rgba(0, 188, 212, 0.6);
	}
</style>`;

customElements.define('purchase-tickets', PurchaseTickets);
