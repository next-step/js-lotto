import { createRandomNumbers } from "../utils/operate.js";
class Lotto {
	#lottos;
	#winningNumbers;
	#bonusNumber;

	issueLottos(number) {
		const lottos = Array.from(Array(number), () => createRandomNumbers());
		this.#lottos = lottos;
		return lottos;
	}

	setResultNumbers(numbers) {
		numbers.length === 1
			? (this.#bonusNumber = numbers)
			: (this.#winningNumbers = numbers);
	}
}

export default new Lotto();
