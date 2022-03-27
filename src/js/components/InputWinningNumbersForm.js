import {EVENT} from '../constants/index.js';
import lottoService, {LOTTO_COUNT} from '../services/lotto-service.js';
import {eventBus, hide, show} from '../lib/index.js';

export class InputWinningNumbersForm {
	constructor($element) {
		this.$element = $element;

		hide(this.$element);
		this.bindEvent();
		this.subscribe();
	}

	bindEvent() {
		this.$element.addEventListener('submit', (event) => {
			event.preventDefault();

			const winningNumbersWithBonus = [
				...new FormData(this.$element).values(),
			].map(Number);

			try {
				lottoService.setLottoResult({
					winningNumbers: winningNumbersWithBonus.slice(0, LOTTO_COUNT),
					bonusNumber: winningNumbersWithBonus[LOTTO_COUNT],
				});
			} catch (error) {
				alert(error.message);
			}
		});
	}

	subscribe() {
		eventBus.on(EVENT.INITIALIZE, () => {
			hide(this.$element);
		});

		eventBus.on(EVENT.PURCHASE_LOTTO, () => {
			show(this.$element);
		});
	}
}
