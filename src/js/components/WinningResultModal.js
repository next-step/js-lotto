import {EVENT, TEXTS} from '../constants/index.js';
import {$, format, eventBus} from '../lib/index.js';
import {LOTTO_PRICE} from '../services/lotto-service.js';
import prizeService, {PrizeService} from '../services/prize-service.js';

export class WinningResultModal {
	constructor($element) {
		this.$element = $element;

		this.isOpened = false;
		this.autoLottoTickets = [];
		this.countByRank = new Map();
		this.earningRate = undefined;

		this.$resultTableBody = $('.resultTableBody');
		this.$earningRate = $('.earningRate');

		this.bindEvent();
		this.subscribe();
	}

	bindEvent() {
		this.$element.addEventListener('click', ({target}) => {
			if (target.classList.contains('modal')) {
				this.setState({isOpened: false});
				return;
			}

			if (target.closest('.modal-close')) {
				this.setState({isOpened: false});
				return;
			}

			if (target.tagName === 'BUTTON') {
				eventBus.emit(EVENT.INITIALIZE);
			}
		});
	}

	subscribe() {
		eventBus.on(EVENT.INITIALIZE, () => {
			this.setState({
				isOpened: false,
				autoLottoTickets: [],
				countByRank: new Map(),
			});
		});

		eventBus.on(EVENT.PURCHASE_LOTTO, ({detail}) => {
			const {autoLottoTickets} = detail;
			this.setState({autoLottoTickets});
		});

		eventBus.on(EVENT.SUBMIT_WINNING_NUMBERS, ({detail: lottoResult}) => {
			this.setState({
				isOpened: true,
				countByRank: prizeService.getCountsByRank(
					this.autoLottoTickets,
					lottoResult,
				),
				earningRate: this.calculateEarningRate({
					earning: prizeService.payPrizes(this.autoLottoTickets, lottoResult),
					purchaseAmount: this.autoLottoTickets.length,
				}),
			});
		});
	}

	setState({isOpened, autoLottoTickets, countByRank, earningRate}) {
		this.isOpened = isOpened ?? this.isOpened;
		this.autoLottoTickets = autoLottoTickets ?? this.autoLottoTickets;
		this.countByRank = countByRank ?? this.countByRank;
		this.earningRate = earningRate ?? this.earningRate;

		this.render();
	}

	render() {
		if (this.isOpened) {
			this.openModal();
			this.renderResultTableBody();
			this.renderEarningRate();
			return;
		}

		this.closeModal();
	}

	renderResultTableBody() {
		this.$resultTableBody.innerHTML = [...PrizeService.matchesByRank.entries()]
			.map(([rank, matches]) =>
				this.createResultTableRowTemplate({
					matches,
					prizeMoney: PrizeService.prizeMoneyByRank.get(rank),
					count: this.countByRank.get(rank) ?? 0,
				}),
			)
			.join('');
	}

	renderEarningRate() {
		this.$earningRate.textContent = format(
			TEXTS.EARNING_RATE,
			this.earningRate,
		);
	}

	calculateEarningRate({earning, purchaseAmount}) {
		return (earning / (purchaseAmount * LOTTO_PRICE)) * 100;
	}

	createResultTableRowTemplate({matches, prizeMoney, count}) {
		return `
			<tr class="text-center">
				<td class="p-3">${this.getMatchesDescription(matches)}</td>
				<td class="p-3">${prizeMoney.toLocaleString('en')}</td>
				<td class="p-3">${count}개</td>
			</tr>
		`;
	}

	getMatchesDescription(matches) {
		return matches.includes('+')
			? format(TEXTS.MATCH_DESCRIPTION_WITH_BONUS, matches.split('+')[0])
			: format(TEXTS.MATCH_DESCRIPTION, matches);
	}

	openModal() {
		this.$element.classList.add('open');
	}

	closeModal() {
		this.$element.classList.remove('open');
	}
}
