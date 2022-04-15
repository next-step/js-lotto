import LottoList from './components/LottoList.js';
import LottoWinningForm from './components/LottoWinningForm.js';
import LottoModal from './components/LottoModal.js';
import LottoManualPurchase from './components/LottoManualPurchase.js';

class App {
  $target;
  $store;
  constructor($target, $store) {
    this.$target = $target;
    this.$store = $store;

    const $LottoManualPurchase = this.$target.querySelector('#lotto-purchase-container');
    const $LottoList = this.$target.querySelector('#lotto-list-container');
    const $formWinning = this.$target.querySelector('#form-winning');
    const $LottoModal = this.$target.querySelector('.modal');

    this.$LottoManualPurchase = new LottoManualPurchase($LottoManualPurchase, {
      store: $store,
    });
    this.$LottoList = new LottoList($LottoList, {
      store: $store,
    });
    this.$LottoWinningForm = new LottoWinningForm($formWinning, {
      store: $store,
    });
    this.$LottoModal = new LottoModal($LottoModal, {
      reStart: this.reStart,
      store: $store,
    });
  }

  reStart = () => {
    this.$store.resetState();

    this.$LottoList.reset();
    this.$LottoManualPurchase.reset();
    this.$LottoWinningForm.reset();
    this.$LottoModal.reset();
  };
}

export default App;
