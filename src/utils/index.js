import { TITLE_WITH_VALUE_MAP } from '../constants.js';

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

export const isDuplicatedInArray = (numberArray) => {
  const numberSet = new Set(numberArray);

  return numberSet.size !== numberArray.length;
};

export const makeCountedLottoNumbers = ({
  lottoNumbers,
  winningInput,
  bonusNumber,
}) => {
  const winningSet = new Set(winningInput);

  //lottoNumbers를 순회하면서 count로 몇개가 WINNINgInput과 동일한지 체크한 값을 넣어줘야함
  return lottoNumbers.map((lottoNumber) => {
    let winningCount = 0,
      isBonusNumber = false;
    for (let i = 0; i < lottoNumber.length; i++) {
      if (winningSet.has(lottoNumber[i])) winningCount++;
      if (bonusNumber === lottoNumber[i]) isBonusNumber = true;
    }
    return {
      lottoNumber,
      winningCount,
      isBonusNumber,
    };
  });
};

const makeNamingByLevel = ({ winningCount, isBonusNumber }) => {
  if (
    (winningCount === 2 && isBonusNumber) ||
    (winningCount === 3 && !isBonusNumber)
  )
    return {
      title: '3개',
      value: TITLE_WITH_VALUE_MAP.get('3개'),
    };
  if (
    (winningCount === 3 && isBonusNumber) ||
    (winningCount === 4 && !isBonusNumber)
  )
    return { title: '4개', value: TITLE_WITH_VALUE_MAP.get('4개') };
  if (
    (winningCount === 4 && isBonusNumber) ||
    (winningCount === 5 && !isBonusNumber)
  )
    return { title: '5개', value: TITLE_WITH_VALUE_MAP.get('5개') };
  if (winningCount === 5 && isBonusNumber)
    return {
      title: '5개 + 보너스볼',
      value: TITLE_WITH_VALUE_MAP.get('5개 + 보너스볼'),
    };
  if (winningCount === 6)
    return { title: '6개', value: TITLE_WITH_VALUE_MAP.get('6개') };
  return {
    title: 'none',
    value: null,
  };
};

export const getWinningCount = ({
  lottoNumbers,
  winningInput,
  bonusNumber,
}) => {
  let totalAdvantage = 0;
  const countedLottoNumbersMap = new Map();
  const countedLottoNumbers = makeCountedLottoNumbers({
    lottoNumbers,
    winningInput,
    bonusNumber,
  })
    .reduce(
      (accumulator, { winningCount, isBonusNumber }, index, originArray) => {
        const isEnd = index === originArray.length - 1;
        const { title, value } = makeNamingByLevel({
          winningCount,
          isBonusNumber,
        });

        accumulator[title] = {
          title,
          value,
          count: (accumulator[title] ? accumulator[title].count : 0) + 1,
        };
        totalAdvantage += value;

        if (isEnd) return Object.values(accumulator);

        return accumulator;
      },
      {}
    )
    .filter((el) => el.title !== 'none');

  countedLottoNumbers.forEach((element) =>
    countedLottoNumbersMap.set(element.title, element.count)
  );

  return {
    countedLottoNumbersMap,
    totalAdvantage,
  };
};

export const makeRateOfReturn = (spend, benefit) => {
  return Math.round((benefit - spend) / spend) * 100;
};
