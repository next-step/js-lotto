import checkLottoNumberMatch from './checkLottoNumberMatch.js';

function getNumberOfWinning(resultNumbers) {
  const matchLottoNumbers = checkLottoNumberMatch(resultNumbers);
  const resultCount = {
    three: 0,
    four: 0,
    five: 0,
    five_bonus: 0,
    six: 0,
  };
  
  matchLottoNumbers.forEach((it, idx) => {
    switch (it.winning) {
      case 3:
        resultCount.three++;
        break;

      case 4:
        resultCount.four++;
        break;

      case 5:
        if (it.bonus !== 0) {
          resultCount.five_bonus++;
          return;
        } else {
          resultCount.five++;
        }
        break;

      case 6:
        resultCount.six++;
        break;

      default:
        break;
    }
  });

  return resultCount;
}

export default getNumberOfWinning;