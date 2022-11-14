const makeRandomNumber = () => {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 45 + 1));
};

export const makeRandomNumbers = (moneyAmount) => {
  return new Array(moneyAmount / 1000).fill(0).map(makeRandomNumber);
};

export const checkRandom = (randomNumberArray) => {
  //bf
  let copy = [...randomNumberArray];

  for (let i = 0; i < copy.length - 1; i++) {
    for (let j = i + 1; j < copy.length; j++) {
      const eachNumbersSetI = new Set(copy[i]),
        eachNumbersSetJ = new Set(copy[j]);

      const DUPLICATE_CONDITION =
        copy[i].every((number1) => eachNumbersSetJ.has(number1)) &&
        copy[j].every((number2) => eachNumbersSetI.has(number2));

      if (DUPLICATE_CONDITION) copy[i] = null;
    }
  }

  copy = copy.filter((el) => Boolean(el));

  const diff = randomNumberArray.length - copy.length;

  if (diff !== 0) {
    const result = [...copy, ...makeRandomNumbers(diff * 1000)];

    return checkRandom(result);
  }

  return [...randomNumberArray];
};
