import {EVENT, LOTTO, TEXTS} from '../constants/index.js';
import {$, format, eventBus, intersections} from '../lib/index.js';
import {Component} from './Component.js';

export class WinningResultModal extends Component {
	constructor($element) {
		super($element);

		this.isOpened = false;
		this.lottos = [];
		this.countByMatch = this.getInitialCountByMatch();

		this.$resultTableBody = $('.resultTableBody');
		this.$earningRate = $('.earningRate');

		this.getInitialCountByMatch();
		this.bindEvent();
		this.subscribe();
	}

	getInitialCountByMatch() {
		return new Map(
			[...LOTTO.PRIZE_MONEY_BY_MATCH].map(([match]) => [match, 0]),
		);
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
				lottos: [],
				countByMatch: this.getInitialCountByMatch(),
			});
			this.closeModal();
		});

		eventBus.on(EVENT.PURCHASE_LOTTO, ({detail: lottos}) => {
			this.setState({lottos});
			this.closeModal();
		});

		eventBus.on(EVENT.SUBMIT_WINNING_NUMBERS, ({detail}) => {
			const {winningNumbers, bonusNumber} = detail;
			const countByMatch = this.getInitialCountByMatch();

			for (const lotto of this.lottos) {
				const match = intersections(
					lotto.numbers,
					new Set(winningNumbers),
				).size;
				const hasBonus = lotto.numbers.has(bonusNumber);

				if (hasBonus && LOTTO.PRIZE_MONEY_BY_MATCH.has(`${match}+`)) {
					countByMatch.set(`${match}+`, countByMatch.get(`${match}+`) + 1);
				} else {
					countByMatch.set(`${match}`, countByMatch.get(`${match}`) + 1);
				}
			}

			this.setState({isOpened: true, countByMatch});
		});
	}

	render() {
		if (this.isOpened) {
			this.openModal();
			this.renderResultBody();
			this.renderEarningRate();
			return;
		}

		this.closeModal();
	}

	renderResultBody() {
		this.$resultTableBody.innerHTML = [...this.countByMatch.entries()]
			.filter(([match]) => LOTTO.PRIZE_MONEY_BY_MATCH.get(match) > 0)
			.map(([match, count]) =>
				this.createResultTableRowTemplate({
					match,
					prizeMoney: LOTTO.PRIZE_MONEY_BY_MATCH.get(match),
					count,
				}),
			)
			.join('');
	}

	renderEarningRate() {
		this.$earningRate.textContent = format(
			TEXTS.EARNING_RATE,
			this.getEarningRate(),
		);
	}

	getEarningRate() {
		let earning = 0;

		for (const [match, count] of this.countByMatch.entries()) {
			earning += count * LOTTO.PRIZE_MONEY_BY_MATCH.get(match);
		}

		return (earning / (this.lottos.length * LOTTO.PRICE)) * 100;
	}

	createResultTableRowTemplate({match, prizeMoney, count}) {
		const matchDescription = match.includes('+')
			? format(TEXTS.MATCH_DESCRIPTION_WITH_BONUS, match.split('+')[0])
			: format(TEXTS.MATCH_DESCRIPTION, match);

		return `
			<tr class="text-center">
				<td class="p-3">${matchDescription}</td>
				<td class="p-3">${prizeMoney.toLocaleString('en')}</td>
				<td class="p-3">${count}개</td>
			</tr>
		`;
	}

	setState({isOpened, lottos, countByMatch}) {
		this.isOpened = isOpened ?? this.isOpened;
		this.lottos = lottos ?? this.lottos;
		this.countByMatch = countByMatch ?? this.countByMatch;
		this.render();
	}

	openModal() {
		this.$element.classList.add('open');
	}

	closeModal() {
		this.$element.classList.remove('open');
	}
}
