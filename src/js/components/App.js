import {EVENT} from '../constants/index.js';
import {$, eventBus} from '../lib/index.js';

import {PurchaseForm} from './PurchaseForm.js';
import {PurchasedLottoSection} from './PurchasedLottoSection.js';
import {InputWinningNumbersForm} from './InputWinningNumbersForm.js';
import {WinningResultModal} from './WinningResultModal.js';

export class App {
	constructor($element) {
		this.$element = $element;

		this.PurchaseForm = new PurchaseForm($('form[name=purchaseForm]'));
		this.PurchasedLottoSection = new PurchasedLottoSection($('#purchasedLottoSection')); // prettier-ignore
		this.InputWinningNumbersForm = new InputWinningNumbersForm($('form[name=inputWinningNumbersForm]')); // prettier-ignore
		this.WinningResultModal = new WinningResultModal($('.winningResultModal'));
	}

	init() {
		eventBus.emit(EVENT.INITIALIZE);
	}
}
