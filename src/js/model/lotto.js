import {LOTTO} from '../constants/index.js';
import {randomNumber} from '../lib/index.js';

export default class Lotto {
	#numbers;

	constructor() {
		this.#numbers = new Set();
		this.initNumbers();
	}

	initNumbers() {
		while (this.#numbers.size < LOTTO.COUNT) {
			this.#numbers.add(
				randomNumber(LOTTO.MINUMUM_LOTTO_VALUE, LOTTO.MAXIMUM_LOTTO_VALUE),
			);
		}
	}

	get numbers() {
		return this.#numbers;
	}

	get numbersString() {
		return [...this.#numbers.values()].join(', ');
	}
}
