import CONSTANTS from '../constants.js';
import View from '../core/View.js';
import { qsa, qs } from '../utils.js';

export default class LastWeekResult extends View {
	constructor(pubsub, dataComponent) {
		super(pubsub, dataComponent);
		this.hidden();
		this.$winningNumbers = qsa(this.$target, '.winning-number');
		this.$bounusNumber = qs(this.$target, '.bonus-number');
		this.$btn = qs(this.$target, 'button');
	}
	addEvents() {
		const self = this;
		this.$target.addEventListener('submit', (e) => {
			e.preventDefault();
		});
		this.$btn.addEventListener('click', (e) => {
			e.preventDefault();
			console.log(this);
			this.pubsub.publish('clickedResultBtn', this.parseNumbers());
			console.log(e);
		});
	}
	parseNumbers() {
		const numbers = Array.from(this.$winningNumbers).map(($num) => $num.value);
		numbers.push(this.$bounusNumber.value);
		return numbers;
	}
	registerSubscribes() {
		this.pubsub.subscribe('lastWeekResultView:show', this.show.bind(this));
	}
}
