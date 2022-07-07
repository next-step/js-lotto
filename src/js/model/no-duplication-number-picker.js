class NoDuplicationNumberPicker {
  constructor() {}
}

function testNumberPicker() {
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
