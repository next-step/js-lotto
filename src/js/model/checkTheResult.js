import displayResult from '../view/displayResult.js';
import showModal from '../view/showModal.js';
import checkDuplicatedNumber from './checkDuplicatedNumber.js';
import getNumberOfWinning from './getNumberOfWinning.js';
import getWinningNumberValues from './getWinningNumberValues.js';

function checkTheResult() {
  const winningNumbers = document.querySelectorAll('.winning-number');
  let winningNumberValues = getWinningNumberValues(winningNumbers);

  try {
    checkDuplicatedNumber(winningNumberValues);
    let resultNumbers = [];
    resultNumbers = [...winningNumberValues];

    showModal();

    const winningCount = getNumberOfWinning(resultNumbers);
    displayResult(winningCount);
  } catch (error) {
    alert(error.message);
  }
}

export default checkTheResult;