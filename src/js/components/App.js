import {STATUS} from '../constants/index.js';
import {$, eventBus} from '../lib/index.js';
import {Component} from './Component.js';
import {PurchaseForm} from './PurchaseForm.js';
import {PurchasedLottoSection} from './PurchasedLottoSection.js';
import {InputWinningNumbersForm} from './InputWinningNumbersForm.js';

export class App extends Component {
	constructor($element) {
		super($element);

		this.PurchaseForm = new PurchaseForm($('form[name=purchaseForm]'));
		this.PurchasedLottoSection = new PurchasedLottoSection(
			$('#purchasedLottoSection'),
		);
		this.InputWinningNumbersForm = new InputWinningNumbersForm(
			$('form[name=inputWinningNumbersForm]'),
		);
	}

	init() {
		eventBus.emit('init', {
			status: STATUS.INIT,
			lottoCount: 0,
			isVisibleLottoNumbers: false,
			isVisibleResultModal: false,
		});
	}
}
