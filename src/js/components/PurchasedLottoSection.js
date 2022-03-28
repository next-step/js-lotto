import {EVENT, TEXTS} from '../constants/index.js';
import {hide, show, format, $, eventBus} from '../lib/index.js';

export class PurchasedLottoSection {
	constructor($element) {
		this.$element = $element;
		this.$purchasedCountLabel = $('.purchasedCountLabel');
		this.$showLottoNumbersToggle = $('input[name=showLottoNumbersToggle]');
		this.$autoPurchasedLottoList = $('.autoPurchasedLottoList');

		this.autoLottoTickets = [];
		this.isVisibleNumbers = false;

		hide(this.$element);
		this.bindEvent();
		this.subscribe();
	}

	bindEvent() {
		this.$showLottoNumbersToggle.addEventListener('change', () => {
			this.setState({
				isVisibleNumbers: this.$showLottoNumbersToggle.checked,
			});
		});
	}

	subscribe() {
		eventBus.on(EVENT.INITIALIZE, () => {
			this.setState({autoLottoTickets: [], isVisibleNumbers: false});
		});

		eventBus.on(EVENT.PURCHASE_LOTTO, ({detail}) => {
			const {autoLottoTickets} = detail;
			this.setState({autoLottoTickets});
		});
	}

	render() {
		this.renderPurchasedCount();
		this.renderAutoPurchasedLottoList();
	}

	setState({autoLottoTickets, isVisibleNumbers}) {
		this.autoLottoTickets = autoLottoTickets ?? this.autoLottoTickets;
		this.isVisibleNumbers = isVisibleNumbers ?? this.isVisibleNumbers;

		if (this.autoLottoTickets.length > 0) {
			show(this.$element);
			this.render();

			return;
		}

		hide(this.$element);
		this.render();
	}

	renderAutoPurchasedLottoList() {
		this.$autoPurchasedLottoList.innerHTML = this.autoLottoTickets
			.map((lotto) =>
				this.createPurchasedLottoItemTemplate({
					isVisibleNumbers: this.isVisibleNumbers,
					numbers: lotto.numbers,
				}),
			)
			.join('');

		this.alignAutoPurchasedLottoList();
	}

	alignAutoPurchasedLottoList() {
		if (this.isVisibleNumbers) {
			this.$autoPurchasedLottoList.classList.add('flex-col');
			return;
		}

		this.$autoPurchasedLottoList.classList.remove('flex-col');
	}

	renderPurchasedCount() {
		this.$purchasedCountLabel.textContent = format(
			TEXTS.AUTO_PURCHASED_COUNT,
			this.autoLottoTickets.length,
		);
	}

	createPurchasedLottoItemTemplate({isVisibleNumbers, numbers}) {
		return `
			<li class="lottoItem mx-1 text-4xl">
				<span class="lottoIcon">🎟️ </span>
				<span class="lottoDetail" ${
					isVisibleNumbers ? '' : 'style="display: none;"'
				}>${[...numbers.values()].join(', ')}</span>
			</li>
		`;
	}
}
