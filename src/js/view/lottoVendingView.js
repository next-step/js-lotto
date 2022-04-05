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

  function initialMoney() {
    $purchaseMoney.value = null;
  }

  function handleResetWinningLottoHistory() {
    initialMoney();
    purchasedHistoryView.initial();
  }

  function eventBindings() {
    $purchaseLotto.addEventListener('submit', handlePurchaseLotto);
    winingLottoHistoryView.eventBindings(handleResetWinningLottoHistory);
  }

  function initial() {
    eventBindings();
    initialMoney();
    purchasedHistoryView.initial();
    winingLottoHistoryView.initial();
  }

  return { initial };
})();
export default lottoVendingView;
