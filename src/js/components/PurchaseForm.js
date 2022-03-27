import {$, eventBus} from '../lib/index.js';
import {EVENT} from '../constants/index.js';
import lottoService from '../services/lotto-service.js';

export class PurchaseForm {
	constructor($element) {
		this.$element = $element;

		this.$purchaseAmountInput = $('input[name="purchaseAmountInput"]');

		this.subscribe();
		this.bindEvent();
	}

	bindEvent() {
		this.$element.addEventListener('submit', (event) => {
			event.preventDefault();

			const purchaseFormData = new FormData(this.$element);

			try {
				lottoService.purchaseLotto({
					purchaseAmount: Number(purchaseFormData.get('purchaseAmountInput')),
				});
			} catch (error) {
				alert(error.message);
			}
		});
	}

	subscribe() {
		eventBus.on(EVENT.INITIALIZE, () => {
			this.$purchaseAmountInput.value = '';
		});
	}
}
