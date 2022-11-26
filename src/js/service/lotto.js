import { LOTTO } from "../constants/lotto.js";
import { createRandomNumbers } from "../utils/operate.js";
class Lotto {
	#lottos;
	#winningNumbers;
	#bonusNumber;
	#result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
	#inputTotal = 0;
	#earningTotal = 0;

	issueLottos(number) {
		const lottos = Array.from(Array(number), () => createRandomNumbers());
		this.#lottos = lottos;
		this.#inputTotal += number * 1000;
		return lottos;
	}

	setWinningOrBonusNumber(numbers) {
		Array.isArray(numbers)
			? (this.#winningNumbers = numbers)
			: (this.#bonusNumber = numbers);
	}

	checkResult() {
		for (const lotto of this.#lottos) {
			const rank = this.setRank(lotto);
			if (!rank) continue;
			this.#result[rank] += 1;
			this.calculateEarningTotal(rank);
		}
		return [this.#result, this.#earningTotal, this.#inputTotal];
	}

	setRank(lottoNumbers) {
		const sameNumberCount = lottoNumbers.filter((lottoNumber) =>
			this.#winningNumbers.includes(lottoNumber)
		).length;

		switch (sameNumberCount) {
			case 6:
				return 1;
			case 5:
				return lottoNumbers.includes(this.#bonusNumber) ? 2 : 3;
			case 4:
				return 4;
			case 3:
				return 5;
			default:
				return 0;
		}
	}

	calculateEarningTotal(rank) {
		this.#earningTotal += LOTTO.PRIZE_MONEY[rank];
	}

	clearResult() {
		this.#result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
	}

	initialize() {
		this.#lottos;
		this.#winningNumbers;
		this.#bonusNumber;
		this.#result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
		this.#inputTotal = 0;
		this.#earningTotal = 0;
	}
}

export default new Lotto();
