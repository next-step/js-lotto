class Lotto {
  static LOTTO_MIN_NUMBER = 1;
  static LOTTO_MAX_NUMBER = 45;
  static LOTTO_LENGTH = 6;

  #numbers = [];

  constructor(number) {
    if (this.#validateNumbers(number)) {
      this.#numbers = number;
    }
  }

  get numbers() {
    return this.#numbers;
  }

  #validateNumbers(numbers) {
    if (numbers.length !== Lotto.LOTTO_LENGTH) {
      throw new Error(`로또 번호는 ${Lotto.LOTTO_LENGTH}개여야 합니다.`);
    }

    const isNumberType = numbers.every((num) => typeof num === "number");
    if (!isNumberType) {
      throw new Error("로또 번호는 숫자만 가능합니다.");
    }

    const isValidRange = numbers.every(
      (num) => num >= Lotto.LOTTO_MIN_NUMBER && num <= Lotto.LOTTO_MAX_NUMBER
    );
    if (!isValidRange) {
      throw new Error(
        `로또 번호는 ${Lotto.LOTTO_MIN_NUMBER}부터 ${Lotto.LOTTO_MAX_NUMBER}사이의 숫자여야 합니다.`
      );
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== Lotto.LOTTO_LENGTH) {
      throw new Error("로또 번호는 중복될 수 없습니다.");
    }

    return true;
  }
}

export default Lotto;
