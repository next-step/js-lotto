import LOTTO from "./lotto.constant";

export function validateNumbers(numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError("numbers는 배열이어야 합니다.");
  }

  if (numbers.length !== LOTTO.COUNT_OF_NUMBERS) {
    throw new RangeError(`numbers는 ${LOTTO.COUNT_OF_NUMBERS}개여야 합니다.`);
  }

  if (new Set(numbers).size !== LOTTO.COUNT_OF_NUMBERS) {
    throw new RangeError("numbers는 중복되지 않아야 합니다.");
  }

  if (numbers.some((number) => typeof number !== "number")) {
    throw new TypeError("numbers의 원소는 number 타입이어야 합니다.");
  }

  if (
    numbers.some(
      (number) => number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER,
    )
  ) {
    throw new RangeError(
      `numbers의 원소는 ${LOTTO.MIN_NUMBER}과 ${LOTTO.MAX_NUMBER} 사이여야 합니다.`,
    );
  }

  return true;
}
