import winingLottoHistoryModalView from './winingLottoHistoryModalView.js';

const winingLottoHistoryView = (function () {
  const $winingLottoHistory = document.querySelector('form.mt-9');
  const $winingResultButton =
    $winingLottoHistory.querySelector('#winingResult');

  function initialWinningHistory() {
    $winingLottoHistory.classList.add('hide');
  }

  function showWinningHistory() {
    $winingLottoHistory.classList.remove('hide');
  }

  function handleWinningResult(event) {
    console.log(event);
    winingLottoHistoryModalView.open();
  }

  function eventBindings() {
    $winingResultButton.addEventListener('click', handleWinningResult);
    $winingLottoHistory.addEventListener('submit', () => console.log(''));
  }

  function initial() {
    initialWinningHistory();
  }

  function changePurchasedHistory() {
    showWinningHistory();
  }

  eventBindings();

  return { initial, changePurchasedHistory };
})();
export default winingLottoHistoryView;
