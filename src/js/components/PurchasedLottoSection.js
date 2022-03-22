import {EVENT, TEXTS} from '../constants/index.js';
import Lotto from '../model/lotto.js';
import {format, $, eventBus} from '../lib/index.js';
import {Component} from './Component.js';

export class PurchasedLottoSection extends Component {
	constructor($element) {
		super($element);

		this.$purchasedCountsLabel = $('.purchasedCountsLabel');
		this.$showLottoNumbersToggle = $('input[name=showLottoNumbersToggle]');
		this.$autoPurchasedLottoList = $('.autoPurchasedLottoList');

		this.lottos = [];
		this.isVisibleDetail = false;

		this.hide();
		this.bindEvent();
		this.subscribe();
	}

	bindEvent() {
		this.$showLottoNumbersToggle.addEventListener('change', () => {
			this.setState({
				isVisibleDetail: this.$showLottoNumbersToggle.checked,
			});
		});
	}

	subscribe() {
		eventBus.on(EVENT.PURCHASE_LOTTO, ({detail: lottoCount}) => {
			this.setState({lottos: this.generateLottos(lottoCount)});
			this.show();
		});
	}

	render() {
		this.renderPurchasedCounts();
		this.renderAutoPurchasedLottoList();
	}

	setState({lottos, isVisibleDetail}) {
		this.lottos = lottos ?? this.lottos;
		this.isVisibleDetail = isVisibleDetail ?? this.isVisibleDetail;
		this.render();
	}

	generateLottos(lottoCount) {
		return Array.from({length: lottoCount}, () => new Lotto());
	}

	renderAutoPurchasedLottoList() {
		this.$autoPurchasedLottoList.innerHTML = this.lottos
			.map((lotto) =>
				this.createPurchasedLottoItemTemplate({
					isVisibleDetail: this.isVisibleDetail,
					detail: lotto.numbersString,
				}),
			)
			.join('');

		this.alignAutoPurchasedLottoList();
	}

	alignAutoPurchasedLottoList() {
		if (this.isVisibleDetail) {
			this.$autoPurchasedLottoList.classList.add('flex-col');
			return;
		}

		this.$autoPurchasedLottoList.classList.remove('flex-col');
	}

	renderPurchasedCounts() {
		this.$purchasedCountsLabel.textContent = format(
			TEXTS.PURCHASED_COUNTS,
			this.lottos.length,
		);
	}

	createPurchasedLottoItemTemplate({isVisibleDetail, detail}) {
		return `
			<li class="lottoItem mx-1 text-4xl">
				<span class="lottoIcon">🎟️ </span>
				<span class="lottoDetail" ${
					isVisibleDetail ? '' : 'style="display: none;"'
				}>${detail}</span>
			</li>
		`;
	}
}
