import LottoList from './components/LottoList.js';
import LottoWinningForm from './components/LottoWinningForm.js';
import LottoModal from './components/LottoModal.js';
import LottoManualPurchase from './components/LottoManualPurchase.js';
import { errorPrintAlert, validateManualLottoList, validatePrice, validateWinningNumber } from './domains/errors.js';
import { createLottoList, getLottoAmount, getManualLottoList, getRankBoard, getWinningNumber } from './domains/index.js';
import { $ } from './utils/index.js';

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
      handleSubmitPurchaseLotto: this.handleSubmitPurchaseLotto.bind(this),
      store: this.$store,
    });
    this.$LottoList = new LottoList($LottoList, {
      handleSubmitLottoPrice: this.handleSubmitLottoPrice.bind(this),
      store: this.$store,
    });
    this.$LottoWinningForm = new LottoWinningForm($formWinning, {
      handleSubmitFormWinning: this.handleSubmitFormWinning.bind(this),
      store: this.$store,
    });
    this.$LottoModal = new LottoModal($LottoModal, {
      reStart: this.reStart.bind(this),
      store: this.$store,
    });
  }

  handleSubmitLottoPrice(e) {
    e.preventDefault();
    const price = e.target['price'].valueAsNumber;
    const { errorMsg } = validatePrice(price);
    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    this.$store.setState({ price });
    $('#lotto-manual-purchase').classList.remove('hidden');
  }

  handleSubmitFormWinning(e) {
    e.preventDefault();
    const { lottoList } = this.$store.state;
    const winningNumber = getWinningNumber(e.target['winning-number']);
    const { errorMsg } = validateWinningNumber(winningNumber);

    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    const rankBoard = getRankBoard({ lottoList, winningNumber });

    this.$store.setState({
      winningNumber,
      rankBoard,
    });
    this.$LottoWinningForm.render();
    $('.modal').classList.toggle('show-modal');
  }

  handleSubmitPurchaseLotto(e) {
    e.preventDefault();
    const { state } = this.$store;
    const manualLottoList = getManualLottoList(e.target['manual-number']);
    const { errorMsg } = validateManualLottoList(manualLottoList);
    const autoLottoCount = getLottoAmount(state.price) - manualLottoList.length;
    const autoLottoList = autoLottoCount ? createLottoList(autoLottoCount) : [];

    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    this.$store.setState({ lottoList: [...autoLottoList, ...manualLottoList] });
    this.$LottoManualPurchase.render();
    $('#form-winning').classList.remove('hidden');
    $('#form-price input').disabled = true;
    $('#form-price button').disabled = true;
    Array.from(document.querySelectorAll('#lotto-manual-purchase button')).forEach(($button) => {
      $button.disabled = true;
    });
    Array.from(document.querySelectorAll('#lotto-manual-purchase input')).forEach(($input) => {
      $input.disabled = true;
    });
  }

  reStart() {
    const $lottoListUl = $('#lotto-list ul');

    this.$store.resetState();
    this.$LottoManualPurchase.render();
    this.$LottoWinningForm.render();
    this.$LottoModal.render();
    $('#form-price input').value = '';
    $('#form-winning').classList.add('hidden');
    $('#lotto-manual-purchase').classList.add('hidden');
    $('.modal').classList.remove('show-modal');
    $lottoListUl.classList.remove('open');
    $('#form-price input').disabled = false;
    $('#form-price button').disabled = false;
    Array.from(document.querySelectorAll('#lotto-manual-purchase button')).forEach(($button) => {
      $button.disabled = false;
    });
    Array.from(document.querySelectorAll('#lotto-manual-purchase input')).forEach(($input) => {
      $input.disabled = false;
    });
  }
}

export default App;
