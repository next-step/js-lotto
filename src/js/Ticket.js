export default class Ticket {
	constructor(values) {
		this.values = [...values];
	}

	render(isExpanded) {
		return isExpanded ? this.expandTicket() : this.foldTicket();
	}

	foldTicket() {
		return `<span class="mx-1 text-4xl">🎟️ </span>`;
	}

	expandTicket() {
		return `
			<li class="mx-1 text-4xl lotto-wrapper">
            	<span class="lotto-icon">🎟️ </span>
            	<span class="lotto-detail" style="display: inline;">${this.values.join(', ')}</span>
        	</li>
		`;
	}
}
