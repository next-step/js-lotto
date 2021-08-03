import View from '../core/View.js';

export default class purchaseInputView extends View {
	constructor(pubsub, dataComponent) {
		super(pubsub, dataComponent);
		this.$input = this.$target.querySelector('input');
		this.$button = this.$target.querySelector('button');
	}
	addEvents() {
		this.$target.addEventListener('submit', (e) => {
			e.preventDefault();
		});
		this.$input.addEventListener('keyup', (e) => {
			e.preventDefault();
			if (e.code !== 'Enter') return;
			this.emitPurchaseInputSumbit();
		});
		this.$button.addEventListener('click', (e) => {
			e.preventDefault();
			this.emitPurchaseInputSumbit();
		});
	}
	registerSubscribes() {
		this.pubsub.subscribe('purchase:reset', () => {
			console.log('called reset');
			this.$input.value = null;
		});
	}
	emitPurchaseInputSumbit() {
		console.log('emmit');
		this.pubsub.publish('purchase:input', this.$input.value);
	}
}
