import winingLottoHistoryModalView from './winingLottoHistoryModalView.js';
import { LOTTO_MAX_NUM, LOTTO_MIN_NUM } from '../constants/lotto.js';

const winingLottoHistoryView = (function () {
  const $winingLottoHistory = document.querySelector('form.mt-9');
  const $winningNumbers = $winingLottoHistory.querySelectorAll(
    'input.winning-number, input.bonus-number'
  );
  const $winningBonusNumber =
    $winingLottoHistory.querySelector('.bonus-number');

  function initialWinningHistory() {
    $winingLottoHistory.classList.add('hide');
  }

  function initElementValue($element) {
    $element.value = null;
  }

  function initialWinningNumbers() {
    $winningNumbers.forEach(($winningNumber) => {
      initElementValue($winningNumber);
    });
  }

  function hideWinningHistory() {
    $winingLottoHistory.classList.add('hide');
  }

  function showWinningHistory() {
    $winingLottoHistory.classList.remove('hide');
  }

  function notificationDuplicateNumber() {
    alert('중복된 당첨 숫자가 존재합니다.');
  }

  function isDuplicatedWinningNumber(number) {
    return (
      Array.from($winningNumbers).filter(
        ($winningNumber) => $winningNumber.value === number
      ).length > 1
    );
  }

  function isInValidWinningNumbers() {
    return Array.from($winningNumbers).some(($winningNumber) =>
      isDuplicatedWinningNumber($winningNumber.value)
    );
  }

  function handleWinningResult(event) {
    event.preventDefault();
    if (isInValidWinningNumbers()) {
      notificationDuplicateNumber();
      return;
    }
    winingLottoHistoryModalView.open();
  }

  function initial() {
    hideWinningHistory();
    initialWinningHistory();
    initialWinningNumbers();
  }

  function callbackResetWinningLottoHistory(onReset) {
    initial();
    onReset();
  }

  function changePurchasedHistory() {
    showWinningHistory();
  }

  function eventBindings(onReset) {
    $winingLottoHistory.addEventListener('submit', handleWinningResult);
    winingLottoHistoryModalView.eventBindings(() =>
      callbackResetWinningLottoHistory(onReset)
    );
    $winningNumbers.forEach(($winningNumber) => {
      $winningNumber.setAttribute('min', LOTTO_MIN_NUM);
      $winningNumber.setAttribute('max', LOTTO_MAX_NUM);
    });
  }

  return { initial, eventBindings, changePurchasedHistory };
})();
export default winingLottoHistoryView;
