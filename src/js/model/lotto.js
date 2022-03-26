import {LOTTO} from '../constants/index.js';
import {randomNumber} from '../lib/index.js';

export default class Lotto {
	#numbers;

	constructor(manualNumbers) {
		this.#numbers = manualNumbers
			? new Set(manualNumbers)
			: this.randomNumbers();
	}

	randomNumbers() {
		const numbers = new Set();

		while (numbers.size < LOTTO.COUNT) {
			numbers.add(
				randomNumber(LOTTO.MINUMUM_LOTTO_VALUE, LOTTO.MAXIMUM_LOTTO_VALUE),
			);
		}

		return numbers;
	}

	get numbers() {
		return this.#numbers;
	}

	static create(manualNumbers) {
		return new Lotto(manualNumbers);
	}

	static autoPurchase({count = 1}) {
		return Array.from({length: count}, () => Lotto.create());
	}
}
