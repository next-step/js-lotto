import {EVENT, MESSAGES, LOTTO} from '../constants/index.js';
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

			const winningNumbersWithBonus = [
				...new FormData(this.$element).values(),
			].map(Number);

			if (hasDuplicates(winningNumbersWithBonus)) {
				alert(MESSAGES.HAS_DUPLICATES_IN_WINNING_NUMBERS_ALERT);
				return;
			}

			eventBus.emit(EVENT.SUBMIT_WINNING_NUMBERS, {
				winningNumbers: winningNumbersWithBonus.slice(0, LOTTO.COUNT),
				bonusNumber: winningNumbersWithBonus[LOTTO.COUNT],
			});
		});
	}

	subscribe() {
		eventBus.on(EVENT.INITIALIZE, () => {
			this.hide();
		});

		eventBus.on(EVENT.PURCHASE_LOTTO, () => {
			this.show();
		});
	}
}
