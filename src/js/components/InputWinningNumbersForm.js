import {EVENT} from '../constants/index.js';
import lottoService, {LOTTO_COUNT} from '../services/lotto-service.js';
import {eventBus} from '../lib/index.js';
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
			this.hide();
		});

		eventBus.on(EVENT.PURCHASE_LOTTO, () => {
			this.show();
		});
	}
}
