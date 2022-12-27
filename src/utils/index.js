import { LOTTO_VALUE, TITLE_WITH_VALUE_MAP } from '../constants.js';

const makeRandomNumber = (minValue = 1, maxValue = 45) => {
  return Math.floor(Math.random() * maxValue + minValue);
};

const makeLottoNumber = () => {
  const numberSet = new Set();
  while (numberSet.size < LOTTO_VALUE.MAX_LOTTO_COUNT) {
    const randomNumber = makeRandomNumber();

    numberSet.add(randomNumber);
  }
  return [...numberSet];
};

export const makeLottoNumbers = (moneyAmount) => {
  if (!Number.isInteger(moneyAmount))
    throw new Error('난수생성을 위해 1000원 단위로 입력되어야 합니다.');

  return new Array(moneyAmount).fill(0).map(makeLottoNumber);
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
    const result = [...filteredNumbers, ...makeLottoNumbers(diff)];

    return checkNumbersDuplidate(result);
  }

  return randomNumberArray;
};

export const isDuplicatedInArray = (numberArray) => {
  const numberSet = new Set(numberArray);

  return numberSet.size !== numberArray.length;
};

export const generateWinningCount = ({
  lottoNumbers,
  winningInput,
  bonusNumber,
}) => {
  const winningSet = new Set(winningInput);

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

const filteringNameByCount = ({ winningCount, isBonusNumber }) => {
  if (winningCount === 5 && isBonusNumber)
    return {
      title: '5개 + 보너스볼',
      value: TITLE_WITH_VALUE_MAP.get('5개 + 보너스볼'),
    };

  if (!TITLE_WITH_VALUE_MAP.has(`${winningCount}개`)) {
    return {
      title: 'none',
      value: null,
    };
  }

  return {
    title: `${isBonusNumber ? winningCount - 1 : winningCount}개`,
    value: TITLE_WITH_VALUE_MAP.get(`${winningCount}개`),
  };
};

export const getWinningCount = ({
  lottoNumbers,
  winningInput,
  bonusNumber,
}) => {
  let totalAdvantage = 0;
  const countedLottoNumbersMap = new Map();
  const countedLottoNumbers = generateWinningCount({
    lottoNumbers,
    winningInput,
    bonusNumber,
  })
    .reduce(
      (accumulator, { winningCount, isBonusNumber }, index, originArray) => {
        const isEnd = index === originArray.length - 1;
        const { title, value } = filteringNameByCount({
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

export const generateTtitleAndValueArray = (titleWithValueMap) => {
  return [...titleWithValueMap.entries()].map(([title, value]) => {
    return { title, value };
  });
};

export const isRerender = ({ currentState, nextState }) => {
  Object.keys(nextState).forEach((key) => {
    if (currentState[key] !== nextState[key]) return true;
  });

  return false;
};

export const makeDataAttributeIdForm = (dataIdsObject) => {
  const formedObject = {};
  Object.entries(dataIdsObject).forEach(
    ([key, value]) => (formedObject[key] = `[data-id=${value}]`)
  );
  return formedObject;
};
