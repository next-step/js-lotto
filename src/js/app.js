import LottoPrice from './components/LottoPrice.js';
import { errorPrintAlert, validatePrice, validateWinningNumber } from './domains/errors.js';
import { createLottoList, getLottoAmount, getRankBoard, getWinningNumber } from './domains/index.js';
import LottoWinningForm from './components/LottoWinningForm.js';
import LottoModal from './components/LottoModal.js';
import { $ } from './utils/index.js';

class App {
  $target;
  $store;
  constructor($target, $store) {
    this.$target = $target;
    this.$store = $store;

    const $LottoPrice = this.$target.querySelector('#lotto-price');
    const $formWinning = this.$target.querySelector('#form-winning');
    const $LottoModal = this.$target.querySelector('.modal');
    this.$LottoPrice = new LottoPrice($LottoPrice, {
      buyLotto: this.buyLotto.bind(this),
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

  buyLotto(e) {
    e.preventDefault();
    const price = e.target['price'].valueAsNumber;
    const { errorMsg } = validatePrice(price);
    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }
    const lottoAmount = getLottoAmount(price);
    const lottoList = createLottoList(lottoAmount);
    this.$store.setState({ price, lottoList });
    $('#form-winning').classList.remove('hidden');
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
      isShowModal: true,
    });
  }

  reStart() {
    this.$store.resetState();
    this.$LottoPrice.render();
    this.$LottoWinningForm.render();
    this.$LottoModal.render();
    $('#form-winning').classList.add('hidden');
  }
}

export default App;
