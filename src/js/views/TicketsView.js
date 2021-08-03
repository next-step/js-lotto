import CONSTANTS from '../constants.js';
import View from '../core/View.js';
import { qs } from '../utils.js';

export default class TicketsView extends View {
	constructor(pubsub, dataComponent) {
		super(pubsub, dataComponent);
		this.hidden();
		this.$ticketCount = qs(this.$target, '.ticket-count-label');
		this.$switch = qs(this.$target, '.switch');
		this.$ticketsContainer = qs(this.$target, '.tickets-container');
	}
	addEvents() {
		this.$switch.addEventListener('click', (e) => {
			console.log(e);
			this.pubsub.publish('toggleSwich');
		});
	}
	registerSubscribes() {
		this.pubsub
			.subscribe('ticketsView:show', this.show.bind(this))
			.subscribe('ticketsView:hidden', this.hidden.bind(this))
			.subscribe('ticketUpdated', this.updateTickets.bind(this))
			.subscribe('ticketsGiven', this.updateTickets.bind(this));
	}
	toggleSwitch() {}
	ticketCountLabelTemplate(sizeOftickets) {
		return `
    ${CONSTANTS.TEXT_COMPONENTS.TICKETS.LABEL_PREFIX} ${sizeOftickets} ${CONSTANTS.TEXT_COMPONENTS.TICKETS.LABEL_POSTFIX}`;
	}
	ticketsWithDetailsTemplate(tickets) {
		return `
    ${tickets
			.map(
				(ticketNumbers) =>
					`
          <div class="mx-1 text-4xl">
            <span>🎟️</span>
            <span>${ticketNumbers.map(String).join(', ')}</span>
          </div>
        `
			)
			.join('')}
    `;
	}
	ticketsNoDetailsTemplate(tickets) {
		return `
    ${tickets.map(() => '<span class="mx-1 text-4xl">🎟️ </span>').join('')}
    `;
	}
	isTicketSwitchOn() {
		return qs(this.$switch, 'input').checked;
	}
	updateTickets(tickets) {
		this.$ticketCount.innerText = this.ticketCountLabelTemplate(tickets.length);
		if (this.isTicketSwitchOn()) {
			this.$ticketsContainer.classList.add('flex-col');
			this.$ticketsContainer.innerHTML =
				this.ticketsWithDetailsTemplate(tickets);
		} else {
			this.$ticketsContainer.classList.remove('flex-col');
			this.$ticketsContainer.innerHTML = this.ticketsNoDetailsTemplate(tickets);
		}
	}
}
