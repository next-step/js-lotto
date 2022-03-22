import {STATUS} from '../constants/index.js';
import {$, eventBus} from '../lib/index.js';
import {Component} from './Component.js';
import {PurchaseForm} from './PurchaseForm.js';

export class App extends Component {
	constructor($element) {
		super($element);

		this.PurchaseForm = new PurchaseForm($('form[name=purchaseForm]'));
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
