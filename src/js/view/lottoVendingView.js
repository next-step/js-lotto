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
    $purchaseMoney.value = '';
  }

  function eventBindings() {
    $purchaseLotto.addEventListener('submit', handlePurchaseLotto);
  }

  function initial() {
    initialMoney();
    purchasedHistoryView.initial();
    winingLottoHistoryView.initial();
  }

  eventBindings();

  return { initial };
})();
export default lottoVendingView;
