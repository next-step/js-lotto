import LottoPrice from './components/LottoPrice.js';
import Component from './core/Component.js';
import { errorPrintAlert, validatePrice, validateWinningNumber } from './domains/errors.js';
import { createLottoList, getLottoAmount, getPriceRate, getRank, getWinningNumber } from './domains/index.js';
import { $, isRangeNumberInLotto } from './utils/index.js';
import LottoWinningForm from './components/LottoWinningForm.js';
import LottoModal from './components/LottoModal.js';

const initState = {
  price: 0,
  lottoList: [],
  isShowLottoList: false,
  inputNumber: {
    number: [],
    bonusNumber: null,
  },
  winningNumber: {
    number: [],
    bonusNumber: null,
  },
  rankBoard: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  isShowModal: false,
};

class App extends Component {
  setup() {
    this.$state = { ...initState };
  }

  template() {
    return `
    <div class="d-flex justify-center mt-5">
      <div class="w-100">
        <h1 class="text-center">🎱 행운의 로또</h1>
        <div id="lotto-price"></div>
        <form class="mt-9 ${this.$state.lottoList.length > 0 ? 'show' : 'hidden'}" id="form-winning"></form>
      </div>
    </div>
    <div class="modal ${this.$state.isShowModal && 'show-modal'}"></div>
    `;
  }
  mounted() {
    const { buyLotto, handleFormWinning, changeInput, reStart } = this;
    const $LottoPrice = this.$target.querySelector('#lotto-price');
    const $formWinning = this.$target.querySelector('#form-winning');
    const $LottoModal = this.$target.querySelector('.modal');

    new LottoPrice($LottoPrice, {
      buyLotto: buyLotto.bind(this),
      lottoList: this.$state.lottoList,
      isShowLottoList: this.$state.isShowLottoList,
    });
    new LottoWinningForm($formWinning, {
      handleFormWinning: handleFormWinning.bind(this),
      changeInput: changeInput.bind(this),
      count: this.$state.count,
      inputNumber: this.$state.inputNumber,
    });
    new LottoModal($LottoModal, {
      reStart: reStart.bind(this),
      rankBoard: this.$state.rankBoard,
      rateToReturn: getPriceRate(this.$state.price, this.$state.rankBoard),
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
    this.setState({ price, lottoList, winningNumber: { number: lottoList[0], bonus: null } });
  }

  handleFormWinning(e) {
    e.preventDefault();
    const { winningNumber, rankBoard } = this.$state;
    const inputNumber = getWinningNumber(e.target['winning-number']);
    const { errorMsg } = validateWinningNumber(inputNumber);

    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    const rank = getRank(inputNumber, winningNumber);
    const newRankBoard = { ...rankBoard };
    newRankBoard[rank] += 1;

    this.setState({
      inputNumber,
      bonusNumber: inputNumber.bonusNumber,
      rankBoard: newRankBoard,
      isShowModal: true,
    });
  }

  changeInput({ target }) {
    const value = target.value;
    const $winningBonusInput = $('input.bonus-number');
    if (value.length > 1) {
      target.nextElementSibling ? target.nextElementSibling.focus() : $winningBonusInput.focus();
    }
  }

  reStart() {
    this.setState({ ...initState });
  }
}

export default App;
