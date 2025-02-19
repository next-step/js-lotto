export class FakeNumberGenerator {
  constructor(randomNumbers) {
    this.randomNumbers = randomNumbers;
  }

  generate() {
    return this.randomNumbers;
  }
}

export default class Lotto {
  selectedNumbers = [];

  constructor(min, max, count, NumberGenerator) {
    this.selectedNumbers = NumberGenerator
      ? NumberGenerator.generate()
      : (this.selectedNumbers = Array.from({ length: count }, () =>
          Math.floor(Math.random() * (max - min + 1) + min)
        ));
  }

  getMatchCount(numbers) {
    return this.selectedNumbers.filter((selectedNumber) =>
      numbers.includes(selectedNumber)
    ).length;
  }

  get numbers() {
    return [...this.selectedNumbers];
  }
}
