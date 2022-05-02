import Lotto from '../../Model/Lotto.js';
import Validate from '../../Model/Validate.js';
import lottoModalView from '../../View/lottoModalView.js';
import winningNumberError from '../error/winningNumberError.js';

const winningNumber = (function () {
  return {
    handleKeyBoardEvent(event) {
      if (Validate.checkWinningNumberUnit(Number(event.target.value))) {
        event.key !== 'Tab' &&
          event.key !== 'Backspace' &&
          event.key !== 'Enter' &&
          event.preventDefault();
      }
    },
    handleSubmitEvent(event) {
      event.preventDefault();
      const winningNumbers = [
        ...event.target.querySelectorAll('.winning-number'),
      ];
      const bonusNumber = event.target.querySelector('.bonus-number');
      const allWinningNumbers = [
        ...winningNumbers.map((tag) => tag.value),
        bonusNumber.value,
      ];
      if (Lotto.winningNumber.isNumberOverRange(allWinningNumbers)) {
        alert(winningNumberError.winningNumberRangeError().message);
        return;
      }

      if (Lotto.winningNumber.isDuplicate(allWinningNumbers)) {
        alert(winningNumberError.winningNumberDuplicateError().message);
        return;
      }

      const { totalRank, totalPrize } = Lotto.winningNumber.checkWinningState(
        winningNumbers.map((tag) => Number(tag.value)),
        Number(bonusNumber.value)
      );

      lottoModalView.updateModalText(totalRank, totalPrize);
      lottoModalView.onModalShow();
    },
  };
})();

export default winningNumber;
