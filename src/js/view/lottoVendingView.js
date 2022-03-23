import purchasedHistoryView from './purchasedHistoryView.js';
import {LottoVendingMachine} from '../lottoVendingMachine.js';

export default (function () {

    const $purchaseLotto = document.querySelector('form.mt-5');
    const $purchaseMoney = $purchaseLotto.querySelector('input');
    const $winingLottoHistory = document.querySelector('form.mt-9');

    function handlePurchaseLotto(event) {
        const money = new FormData(event.currentTarget).get('money');
        event.preventDefault();
        purchasedHistoryView.changePurchasedHistory(LottoVendingMachine.purchaseLotto(money));
    }

    function initialMoney() {
        $purchaseMoney.value = '';
    }

    function initialWinningHistory() {
        $winingLottoHistory.style.display = 'none';
    }

    function eventBindings() {
        $purchaseLotto.addEventListener(
            'submit',
            handlePurchaseLotto
        );
    }

    function initial() {
        initialMoney();
        initialWinningHistory();
        purchasedHistoryView.initial();
    }

    eventBindings();

    return { initial };
})();
