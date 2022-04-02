import LottoPrice from './components/LottoPrice.js';
import Component from './core/Component.js';
import { errorPrintAlert, validatePrice, validateWinningNumber } from './domains/errors.js';
import { createLottoList, getCount, getPriceRate, getRank, getWinningNumber } from './domains/index.js';
import { getSelector, isRangeNumberInLotto } from './utils/index.js';
import LottoWinningForm from './components/LottoWinningForm.js';
import LottoModal from './components/LottoModal.js';

const initState = {
  price: 0,
  count: 0,
  lottoList: [],
  isShowLottoList: false,
  inputNumber: {
    winningNumber: [],
    bonusNumber: null,
  },
  winningNumber: [],
  rank: {
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
        <form class="mt-9 ${this.$state.count ? 'show' : 'hidden'}" id="form-winning"></form>
      </div>
    </div>
    <div class="modal ${this.$state.isShowModal && 'show-modal'}"></div>
    `;
  }
  mounted() {
    const { buyLotto, result, changeInput, reStart } = this;
    const $LottoPrice = this.$target.querySelector('#lotto-price');
    const $formWinning = this.$target.querySelector('#form-winning');
    const $LottoModal = this.$target.querySelector('.modal');

    new LottoPrice($LottoPrice, {
      buyLotto: buyLotto.bind(this),
      lottoList: this.$state.lottoList,
      count: this.$state.count,
      isShowLottoList: this.$state.isShowLottoList,
    });
    new LottoWinningForm($formWinning, {
      result: result.bind(this),
      changeInput: changeInput.bind(this),
      count: this.$state.count,
      inputNumber: this.$state.inputNumber,
    });
    new LottoModal($LottoModal, {
      reStart: reStart.bind(this),
      rank: this.$state.rank,
      rateToReturn: getPriceRate(this.$state.price, this.$state.rank),
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
    const count = getCount(price);
    const lottoList = createLottoList(count);
    this.setState({ price, count, lottoList, winningNumber: lottoList[0] });
  }

  result(e) {
    e.preventDefault();
    const { winningNumber, rank } = this.$state;
    const inputNumber = getWinningNumber(e.target['winning-number']);
    const { errorMsg } = validateWinningNumber(inputNumber.winningNumber, inputNumber.bonusNumber);
    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }
    const _rank = getRank(inputNumber, winningNumber, inputNumber.bonusNumber);
    const newRank = { ...rank };
    newRank[_rank] += 1;

    this.setState({ inputNumber, bonusNumber: inputNumber.bonusNumber, rank: newRank, isShowModal: true });
  }

  changeInput({ target }) {
    const value = target.value;
    const $winningBonusInput = getSelector('input.bonus-number');
    if (!isRangeNumberInLotto(Number(value))) {
      target.value = value.substr(0, value.length - 1);
    }
    if (value.length > 1) {
      target.nextElementSibling ? target.nextElementSibling.focus() : $winningBonusInput.focus();
    }
  }

  reStart() {
    this.setState({ ...initState });
  }
}

export default App;
