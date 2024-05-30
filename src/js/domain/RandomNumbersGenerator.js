import { LOTTO_LENGTH, MAXIMUM_LOTTO_NUMBER } from "../constants";

export class RandomNumbersGenerator {
  #numbers = Array.from({ length: MAXIMUM_LOTTO_NUMBER }, (_, i) => i + 1);

  shuffleNumbers() {
    return [...this.#numbers].sort(() => 0.5 - Math.random());
  }

  generateRandomNumbers() {
    const randomNumbers = this.shuffleNumbers();
    return randomNumbers.slice(0, LOTTO_LENGTH);
  }
}
