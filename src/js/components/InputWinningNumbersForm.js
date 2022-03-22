import {EVENT, MESSAGES} from '../constants/index.js';
import {eventBus, hasDuplicates} from '../lib/index.js';
import {Component} from './Component.js';

export class InputWinningNumbersForm extends Component {
	constructor($element) {
		super($element);

		this.hide();
		this.bindEvent();
		this.subscribe();
	}

	bindEvent() {
		this.$element.addEventListener('submit', (event) => {
			event.preventDefault();

			const winningNumbers = [...new FormData(this.$element).values()].map(
				Number,
			);

			if (hasDuplicates(winningNumbers)) {
				alert(MESSAGES.HAS_DUPLICATES_IN_WINNING_NUMBERS_ALERT);
			}
		});
	}

	subscribe() {
		eventBus.on(EVENT.PURCHASE_LOTTO, () => {
			this.show();
		});
	}

	render() {}

	setState() {
		this.render();
	}
}
