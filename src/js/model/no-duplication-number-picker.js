export class NoDuplicationNumberPicker {
  #length;
  #maxValue;

  constructor({ length, maxValue }) {
    if (length > maxValue) {
      throw Error("length가 maxValue보다 큽니다.");
    }

    this.#length = length;
    this.#maxValue = maxValue;
  }

  pick() {
    const result = new Array(this.#length).fill(null);

    const numbers = new Array(this.#maxValue).fill(null).map((_, i) => i + 1);

    result.forEach((_, i) => {
      const pickedIndex = Math.floor(Math.random() * numbers.length);
      const [pickedNumber] = numbers.splice(pickedIndex, 1);

      result[i] = pickedNumber;
    });

    return result;
  }
}

export function testNumberPicker() {
  const length = 10;
  const maxValue = 50;
  const numberPicker = new NoDuplicationNumberPicker({ length, maxValue });

  const numbers = numberPicker.pick();

  const isNoDuplication = !checkDuplication(numbers);
  const isSameLength = numbers.length === length;
  const isValidRange = numbers.some(
    (number) => number <= maxValue && number >= 1
  );

  console.log(isNoDuplication, isSameLength, isValidRange);
}

const checkDuplication = (numbers) =>
  numbers.some((number, i) =>
    numbers.some(
      (comparativeNumber, j) => comparativeNumber === number && i !== j
    )
  );
