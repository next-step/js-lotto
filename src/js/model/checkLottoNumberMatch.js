import getLottoDetailNumbers from './getLottoDetailNumbers.js';
import includeNumberOfArray from './includeNumberOfArray.js';

function checkLottoNumberMatch(resultNumbers) {
  const bonusNumber = document.querySelector('.bonus-number');
  const bonusNumberValue = bonusNumber.value;
  let lottoDetailNumbers = getLottoDetailNumbers();
  let matchNumberCount = [];

  lottoDetailNumbers.forEach((lottoNumber, i) => {
    matchNumberCount.push({winning: 0, bonus: 0});

    lottoNumber.forEach((_, j) => {
      if(includeNumberOfArray(lottoNumber, resultNumbers[j])) {
        matchNumberCount[i].winning++;
      } 
    });

    if (includeNumberOfArray(lottoNumber, bonusNumberValue)) {
      matchNumberCount[i].bonus++;
    }
  });
  
  return matchNumberCount;
}

export default checkLottoNumberMatch;