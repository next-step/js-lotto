const makeRandomNumber = (minValue = 1, maxValue = 45) => {
  return Math.floor(Math.random() * maxValue + minValue);
};

const makeLottoNumber = () => {
  const MAX_LOTTO_COUNT = 6;
  const numberSet = new Set();
  while (numberSet.size < MAX_LOTTO_COUNT) {
    const randomNumber = makeRandomNumber();

    if (!numberSet.has(randomNumber)) numberSet.add(randomNumber);
  }
  return [...numberSet];
};

export const makeLottoNumbers = (moneyAmount) => {
  if (moneyAmount % 1000 !== 0)
    throw new Error('난수생성을 위해 1000원 단위로 입력되어야 합니다.');

  return new Array(moneyAmount / 1000).fill(0).map(makeLottoNumber);
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
    const result = [...filteredNumbers, ...makeLottoNumbers(diff * 1000)];

    return checkNumbersDuplidate(result);
  }

  return randomNumberArray;
};
