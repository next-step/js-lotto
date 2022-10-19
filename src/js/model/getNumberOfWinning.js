import checkLottoNumberMatch from './checkLottoNumberMatch.js';

function getNumberOfWinning(resultNumbers) {
  const matchLottoNumbers = checkLottoNumberMatch(resultNumbers);
  
  return matchLottoNumbers.reduce((prev, curr) => {
    switch (curr.winning) {
      case 3:
        return {...prev, three: prev.three + 1};

      case 4:
        return {...prev, four: prev.four + 1};

      case 5:
        if (curr.bonus !== 0) {
          return {...prev, five_bonus: prev.five_bonus + 1};
        } else {
          return {...prev, five: prev.five + 1};
        }

      case 6:
        return {...prev, six: prev.six + 1};

      default:
        return prev;
    }
  }, {
    three: 0,
    four: 0,
    five: 0,
    five_bonus: 0,
    six: 0,
  });
}

export default getNumberOfWinning;