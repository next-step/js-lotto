import purchasedHistoryView from './purchasedHistoryView.js';
import { LottoVendingMachine } from '../lottoVendingMachine.js';
import winingLottoHistoryView from './winingLottoHistoryView.js';

const lottoVendingView = (function () {
  const $purchaseLotto = document.querySelector('form.mt-5');
  const $purchaseMoney = $purchaseLotto.querySelector('input');

  function handlePurchaseLotto(event) {
    const money = new FormData(event.currentTarget).get('money');
    event.preventDefault();
    purchasedHistoryView.changePurchasedHistory(
      LottoVendingMachine.purchaseLotto(money)
    );
    winingLottoHistoryView.changePurchasedHistory();
  }

  function initializeMoney() {
    $purchaseMoney.value = null;
  }

  function handleResetWinningLottoHistory() {
    initializeMoney();
    purchasedHistoryView.initialize();
  }

  function eventBindings() {
    $purchaseLotto.addEventListener('submit', handlePurchaseLotto);
    winingLottoHistoryView.eventBindings(handleResetWinningLottoHistory);
  }

  function initialize() {
    eventBindings();
    initializeMoney();
    purchasedHistoryView.initialize();
    winingLottoHistoryView.initialize();
  }

  return { initialize };
})();
export default lottoVendingView;
