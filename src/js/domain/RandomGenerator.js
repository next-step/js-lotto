import { LOTTO_LENGTH, MAXIMUM_LOTTO_NUMBER } from "../constants";

export class RandomGenerator {
  #numbers = Array.from({ length: MAXIMUM_LOTTO_NUMBER }, (_, i) => i + 1);

  shuffleNumbers() {
    return this.#numbers.reduce(
      (shuffled, _, i) => {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
        return shuffled;
      },
      [...this.#numbers]
    );
  }

  generateRandomNumbers() {
    const randomNumbers = this.shuffleNumbers();
    return randomNumbers.slice(0, LOTTO_LENGTH).sort((a, b) => a - b);
  }
}
