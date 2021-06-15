import PaymentView from '../view/PaymentView.js';
import LottosView from '../view/LottosView.js';
import WinningNumberView from '../view/WinningNumberView.js';
import ModalView from '../view/ModalView.js';
import { MINIMUM_PAYMENT_MESSAGE, MAXIMUM_PAYMENT_MESSAGE, PAYMENT_UNIT_ERROR_MESSAGE, DUPLICATE_NUMBER_ERROR_MESSAGE, MINIMUM_NUMBER_MESSAGE, MAXIMUM_NUMBER_MESSAGE } from '../utils/contants.js';

function get6RandomNumbers() {
	const numbers = [];
	while (numbers.length !== 6) {
		const random = Math.floor(Math.random() * 45) + 1;
		if (!numbers.includes(random)) {
			numbers.push(random);
		}
	}

	return numbers;
}

export default class LottoController {
	constructor(model) {
		this.model = model;
		this.PaymentView = new PaymentView();
		this.PaymentView.bindEvent(this.handlePayment);
		this.LottosView = new LottosView(model);
		this.LottosView.bindEvent(this.handleSwitch);
		this.WinningNumberView = new WinningNumberView();
		this.WinningNumberView.bindEvent(this.handleResult);
		this.ModalView = new ModalView(model);
		this.ModalView.bindEvent(this.handleReset);
	}

	handlePayment = (value) => {
		if (value < 1000) {
			alert(MINIMUM_PAYMENT_MESSAGE);
			this.PaymentView.resetInput();
			return;
		} else if (value > 100000) {
			alert(MAXIMUM_PAYMENT_MESSAGE);
			this.PaymentView.resetInput();
			return;
		}

		if (value % 1000 !== 0) {
			alert(PAYMENT_UNIT_ERROR_MESSAGE);
			this.PaymentView.resetInput();
			return;
		}

		this.model.setPayment(value);

		const num = this.model.getPayment() / 1000;
		const values = Array.from({ length: num }, () => get6RandomNumbers());
		this.model.setLottoValues(values);

		this.LottosView.changeVisibility(true);
		this.LottosView.setNum(num);
		this.LottosView.setLottos(values);
		this.LottosView.renderLottos();

		this.WinningNumberView.changeVisibility(true);
	}

	handleSwitch = () => {
		const current = this.LottosView.getFoldedFlag();
		this.LottosView.setFoldedFlag(!current);
		this.LottosView.renderLottos();
	};

	handleResult = (numbers) => {
		if (numbers.some((num) => num < 1)) {
			alert(MINIMUM_NUMBER_MESSAGE);
			return;
		}

		if (numbers.some((num) => num > 45)) {
			alert(MAXIMUM_NUMBER_MESSAGE);
			return;
		}
		
		if (numbers.length !== new Set(numbers).size) {
			alert(DUPLICATE_NUMBER_ERROR_MESSAGE);
			return;
		}

		this.model.setWinningNumbers(numbers);
		this.ModalView.render(this.model.getLottoValues(), this.model.getWinningNumbers());
	}

	handleReset = () => {
		this.model.init();
		this.PaymentView.resetInput();
		this.WinningNumberView.resetInputs();
		this.ModalView.remove();
		this.LottosView.changeVisibility(false);
		this.WinningNumberView.changeVisibility(false);
	}
}