import LottoList from './components/LottoList.js';
import LottoWinningForm from './components/LottoWinningForm.js';
import LottoModal from './components/LottoModal.js';
import LottoManualPurchase from './components/LottoManualPurchase.js';
import { errorPrintAlert, validateManualLottoList, validatePrice, validateWinningNumber } from './domains/errors.js';
import { createLottoList, getLottoAmount, getManualLottoList, getRankBoard, getWinningNumber } from './domains/index.js';

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
      store: this.$store,
    });
    this.$LottoList = new LottoList($LottoList, {
      store: this.$store,
    });
    this.$LottoWinningForm = new LottoWinningForm($formWinning, {
      store: this.$store,
    });
    this.$LottoModal = new LottoModal($LottoModal, {
      reStart: this.reStart,
      store: this.$store,
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
