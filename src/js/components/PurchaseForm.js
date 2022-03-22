import {divmod, $, eventBus} from '../lib/index.js';
import {LOTTO, EVENT, MESSAGES} from '../constants/index.js';
import {Component} from './Component.js';

export class PurchaseForm extends Component {
	constructor($element) {
		super($element);

		this.$purchaseAmountInput = $('input[name="purchaseAmountInput"]');

		this.subscribe();
		this.bindEvent();
	}

	bindEvent() {
		this.$element.addEventListener('submit', (event) => {
			event.preventDefault();

			const purchaseFormData = new FormData(this.$element);
			const purchaseAmount = Number(
				purchaseFormData.get('purchaseAmountInput'),
			);
			const [quotient, remainder] = divmod(purchaseAmount, LOTTO.PRICE);

			if (remainder) {
				alert(MESSAGES.NON_UNIT_VALUE_ALERT);
				return;
			}

			eventBus.emit(EVENT.PURCHASE_LOTTO, quotient);
		});
	}

	subscribe() {
		eventBus.on(EVENT.INIT, () => {
			this.$purchaseAmountInput.value = '';
		});
	}
}
