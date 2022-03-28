import winingLottoHistoryModalView from './winingLottoHistoryModalView.js';
import { LOTTO_MAX_NUM, LOTTO_MIN_NUM } from '../constants/lotto.js';

const winingLottoHistoryView = (function () {
  const $winingLottoHistory = document.querySelector('form.mt-9');
  const $winingResultButton =
    $winingLottoHistory.querySelector('#winingResult');
  const $winningNumbers =
    $winingLottoHistory.querySelectorAll('.winning-number');
  const $winningBonusNumber =
    $winingLottoHistory.querySelector('.bonus-number');

  function initialWinningHistory() {
    $winingLottoHistory.classList.add('hide');
  }

  function initialWinningNumbers() {
    $winningNumbers.forEach(($winningNumber) => {
      $winningNumber.setAttribute('value', null);
    });
    $winningBonusNumber.setAttribute('value', null);
  }

  function hideWinningHistory() {
    $winingLottoHistory.classList.add('hide');
  }

  function showWinningHistory() {
    $winingLottoHistory.classList.remove('hide');
  }

  function handleWinningResult(event) {
    event.preventDefault();
    // if (validateWinningNumbers()) {
    // }
    winingLottoHistoryModalView.open();
  }

  function initial() {
    hideWinningHistory();
    initialWinningHistory();
    initialWinningNumbers();
  }

  function changePurchasedHistory() {
    showWinningHistory();
  }

  function eventBindings() {
    $winingLottoHistory.addEventListener('submit', handleWinningResult);
    winingLottoHistoryModalView.eventBindings(initial);
    $winningNumbers.forEach(($winningNumber) => {
      $winningNumber.setAttribute('min', LOTTO_MIN_NUM);
      $winningNumber.setAttribute('max', LOTTO_MAX_NUM);
    });
  }

  eventBindings();

  return { initial, changePurchasedHistory };
})();
export default winingLottoHistoryView;
