import LottoPrizeRules from "./LottoPrizeRules";
import LottoTicketRules from "./LottoTicketRules";

export default class LottoPrizeCalculator {
  #prizeRules;
  #ticketRules;
  #winningNumbers;
  #bonusNumber;
  static #NUMBER_TYPE = Object.freeze({
    PRIZE: "당첨",
    BONUS: "보너스",
    LOTTO: "로또",
  });

  constructor(prizeRules, ticketRules) {
    this.#prizeRules =
      prizeRules instanceof LottoPrizeRules
        ? prizeRules
        : new LottoPrizeRules();
    this.#ticketRules =
      ticketRules instanceof LottoTicketRules
        ? ticketRules
        : new LottoTicketRules();
  }

  validateNumber(number, numberType) {
    if (typeof number !== "number" || !Number.isInteger(number)) {
      throw new Error(`${numberType} 번호는 정수이어야 합니다.`);
    }

    if (number > this.#ticketRules.max || number < this.#ticketRules.min) {
      throw new Error(`${numberType} 번호가 규칙의 범위를 벗어납니다.`);
    }
  }

  validateNumbers(numbers, numberType) {
    if (!Array.isArray(numbers)) {
      throw new Error(`${numberType} 번호는 배열이어야 합니다`);
    }

    if (numbers.length !== this.#ticketRules.length) {
      throw new Error(`${numberType} 번호의 개수가 규칙과 일치하지 않습니다.`);
    }

    numbers.forEach((number) => {
      this.validateNumber(number, numberType);
    });

    if (new Set(numbers).size !== numbers.length) {
      throw new Error(`${numberType} 번호는 중복될 수 없습니다.`);
    }
  }

  setWinningNumbers(numbers) {
    this.validateNumbers(numbers, LottoPrizeCalculator.#NUMBER_TYPE.PRIZE);

    this.#winningNumbers = [...numbers];
  }

  setBonusNumber(number) {
    this.validateNumber(number, LottoPrizeCalculator.#NUMBER_TYPE.BONUS);

    if (this.#winningNumbers.includes(number)) {
      throw new Error("보너스 번호와 당첨번호가 중복됩니다");
    }

    this.#bonusNumber = number;
  }

  calculatePrize(numbers) {
    if (this.#winningNumbers === undefined || this.#bonusNumber === undefined) {
      throw new Error("당첨번호와 보너스 번호를 설정해야합니다.");
    }

    this.validateNumbers(numbers, LottoPrizeCalculator.#NUMBER_TYPE.LOTTO);

    const numbersSet = new Set(numbers);

    return this.#prizeRules.rules.find((rule) => {
      const correctNumberCount = this.#winningNumbers.reduce(
        (prev, current) => (numbersSet.has(current) ? prev + 1 : prev),
        0,
      );

      const isBonusNumberCorrect = numbersSet.has(this.#bonusNumber);

      if (
        rule.requiresBonusNumber &&
        isBonusNumberCorrect &&
        correctNumberCount === rule.matchingNumberCount
      ) {
        return true;
      }

      return (
        !rule.requiresBonusNumber &&
        correctNumberCount === rule.matchingNumberCount
      );
    });
  }
}
