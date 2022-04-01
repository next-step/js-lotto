import LottoPrice from './components/LottoPrice.js';
import Component from './core/Component.js';
import { errorPrintAlert, validatePrice, validateWinningNumber } from './domains/errors.js';
import { createLottoList, getCount, getWinningNumber } from './domains/index.js';
import { getSelector, isRangeNumberInLotto } from './utils/index.js';
import LottoWinningForm from './components/LottoWinningForm.js';

const initState = {
  price: 0,
  count: 0,
  lottoList: [],
  isShowLottoList: false,
  winningNumber: [],
  bonusNumber: null,
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
    `;
  }
  mounted() {
    const { buyLotto, result, changeInput } = this;
    const $LottoPrice = this.$target.querySelector('#lotto-price');
    const $formWinning = this.$target.querySelector('#form-winning');

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
    this.setState({ price, count, lottoList });
  }

  result(e) {
    e.preventDefault();
    const { winningNumber, bonusNumber } = getWinningNumber(e.target['winning-number']);
    const { errorMsg } = validateWinningNumber(winningNumber, bonusNumber);
    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    this.setState({ winningNumber, bonusNumber });
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
}

export default App;
