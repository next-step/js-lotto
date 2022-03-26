import {invert, intersections} from '../lib/index.js';

export class PrizeService {
	static get matchesByRank() {
		return new Map([
			[1, '6'],
			[2, '5+'],
			[3, '5'],
			[4, '4'],
			[5, '3'],
		]);
	}

	static get rankByMatches() {
		return invert(PrizeService.matchesByRank);
	}

	static get prizeMoneyByRank() {
		return new Map([
			[1, 2_000_000_000],
			[2, 30_000_000],
			[3, 1_500_000],
			[4, 50_000],
			[5, 5000],
		]);
	}

	getRank(lottoTicket, lottoResult) {
		const matches = intersections(lottoTicket.numbers, lottoResult.winningNumbers).size; // prettier-ignore
		const matchBonus = lottoTicket.numbers.has(lottoResult.bonusNumber);

		if (matchBonus && PrizeService.rankByMatches.has(`${matches}+`)) {
			return PrizeService.rankByMatches.get(`${matches}+`);
		}

		return PrizeService.rankByMatches.get(`${matches}`);
	}

	getCountsByRank(lottoTickets, lottoResult) {
		return (
			lottoTickets
				.map((lotto) => this.getRank(lotto, lottoResult))
				.filter(Boolean)
				// eslint-disable-next-line unicorn/no-array-reduce
				.reduce(
					(countByRank, rank) =>
						countByRank.has(rank)
							? countByRank.set(rank, countByRank.get(rank) + 1)
							: countByRank.set(rank, 1),
					new Map(),
				)
		);
	}

	payPrize(lottoTicket, lottoResult) {
		const rank = this.getRank(lottoTicket, lottoResult);

		return PrizeService.prizeMoneyByRank.get(rank) ?? 0;
	}

	payPrizes(lottoTickets, lottoResult) {
		return lottoTickets
			.map((lottoTicket) => this.payPrize(lottoTicket, lottoResult))
			.reduce((totalPrize, currentPrize) => totalPrize + currentPrize, 0);
	}
}

export default new PrizeService();
