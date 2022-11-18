const makeRandomNumber = () => {
  let numbers = [];

  while (numbers.length < 6) {
    const set = new Set();
    const randomNumber = Math.floor(Math.random() * 45 + 1);

    if (!set.has(randomNumber)) {
      set.add(randomNumber);
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

export const makeRandomNumbers = (moneyAmount) => {
  if (moneyAmount % 1000 !== 0)
    throw new Error('난수생성을 위해 1000원 단위로 입력되어야 합니다.');

  return new Array(moneyAmount / 1000).fill(0).map(makeRandomNumber);
};

export const checkNumbersDuplidate = (randomNumberArray) => {
  if (randomNumberArray.length <= 1) return randomNumberArray;

  const veirifiedLottoNumbers = randomNumberArray.map(
    (currentRow, rowIndex) => {
      const currentSet = new Set(currentRow);

      for (
        let start = rowIndex + 1;
        start < randomNumberArray.length;
        start++
      ) {
        const isDuplicated = randomNumberArray[start].every((currentNumber) =>
          currentSet.has(currentNumber)
        );

        if (isDuplicated) return { isDuplicated: true, numbers: currentRow };
      }
      return { isDuplicated: false, numbers: currentRow };
    }
  );

  const filteredNumbers = veirifiedLottoNumbers
    .filter(({ isDuplicated }) => isDuplicated === false)
    .map(({ numbers }) => numbers);

  const diff = randomNumberArray.length - filteredNumbers.length;

  if (diff !== 0) {
    const result = [...filteredNumbers, ...makeRandomNumbers(diff * 1000)];

    return checkRandom(result);
  }

  return randomNumberArray;
};
