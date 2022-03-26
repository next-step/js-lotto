import {EVENT, TEXTS} from '../constants/index.js';
import {format, $, eventBus} from '../lib/index.js';
import {Component} from './Component.js';

export class PurchasedLottoSection extends Component {
	constructor($element) {
		super($element);

		this.$purchasedCountLabel = $('.purchasedCountLabel');
		this.$showLottoNumbersToggle = $('input[name=showLottoNumbersToggle]');
		this.$autoPurchasedLottoList = $('.autoPurchasedLottoList');

		this.lottos = [];
		this.isVisibleNumbers = false;

		this.hide();
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
			this.setState({lottos: [], isVisibleNumbers: false});
		});

		eventBus.on(EVENT.PURCHASE_LOTTO, ({detail: lottos}) => {
			this.setState({lottos});
		});
	}

	render() {
		this.renderPurchasedCount();
		this.renderAutoPurchasedLottoList();
	}

	setState({lottos, isVisibleNumbers}) {
		this.lottos = lottos ?? this.lottos;
		this.isVisibleNumbers = isVisibleNumbers ?? this.isVisibleNumbers;

		if (this.lottos.length > 0) {
			this.show();
			this.render();

			return;
		}

		this.hide();
		this.render();
	}

	renderAutoPurchasedLottoList() {
		this.$autoPurchasedLottoList.innerHTML = this.lottos
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
			TEXTS.PURCHASED_COUNT,
			this.lottos.length,
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
