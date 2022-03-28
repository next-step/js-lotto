import Component from '../core/Component.js';
import Lotto from '../components/Lotto.js';
import store from '../store/store.js';
import { $, $$ } from '../utils/dom.js';
import {
  LOTTO_NUMBER_MAXIMUM,
  LOTTO_NUMBER_MINIMUM,
  LOTTO_PRICE_MINIMUM,
} from '../utils/constants.js';
import validation from '../validation.js';
import actionMap from '../actionMap.js';

class ShowLottoNumberSection extends Component {
  constructor(target) {
    super(target);

    this.$lottoContainer = $('.lotto-container', this.$target);
    this.$bonusNumberInput = $('[aria-label="bonus-number"]', this.$target);
    this.purchasedLottoNumbers = [];
    this.render();
  }

  setLottoContainer() {
    this.$lottoContainer.innerHTML = '';
    const { price, purchasedLottoNumbers } = store.getState();
    const lottoNumber = price / LOTTO_PRICE_MINIMUM;
    let lottoElement;
    new Array(lottoNumber).fill(0).forEach((_, lottoNumberIndex) => {
      if (purchasedLottoNumbers.length !== 0) {
        lottoElement = Lotto(purchasedLottoNumbers[lottoNumberIndex]);
      } else {
        const lotto = this.createOneLotto();
        lottoElement = Lotto(lotto);
      }
      this.$lottoContainer.appendChild(lottoElement);
    });
  }

  createOneLotto = () => {
    const lotto = [];
    while (lotto.length !== 6) {
      const randomNumber = this.getLottoNumber();
      if (lotto.includes(randomNumber)) {
        continue;
      }
      lotto.push(randomNumber);
    }
    this.purchasedLottoNumbers.push(lotto);
    return lotto;
  };

  getLottoNumber = () => {
    return parseInt(
      Math.random() * (LOTTO_NUMBER_MAXIMUM - LOTTO_NUMBER_MINIMUM) +
        LOTTO_NUMBER_MINIMUM
    );
  };

  setStoreWinLottoNumber = (lottoNumbers) => {
    actionMap?.SET_WIN_LOTTO_NUMBER(lottoNumbers);
  };

  setStoreLottoNumber = (lottoNumber) => {
    actionMap?.SET_PURCHASED_LOTTO_NUMBERS(lottoNumber);
  };

  setStoreLottoBonusNumber = (bonusNumber) => {
    actionMap?.SET_PURCHASED_LOTTO_BONUS_NUMBER(bonusNumber);
  };

  setEvents() {
    $('.lotto-numbers-toggle-button').addEventListener('change', (event) => {
      this.isShow = event.target.checked;
      if (this.isShow) {
        $('#purcharsed-lottos').classList.add('flex-col');
        $$('#purcharsed-lottos .lotto-detail').forEach((li) =>
          li.classList.remove('display-none')
        );
      } else {
        $('#purcharsed-lottos').classList.remove('flex-col');
        $$('#purcharsed-lottos .lotto-detail').forEach((li) =>
          li.classList.add('display-none')
        );
      }
    });

    $('#show-result-btn').addEventListener('click', () => {
      if (
        validation.emptyLottoNumber() ||
        validation.lottoNumberUnderMinimum() ||
        validation.lottoNumberOverMaximum() ||
        validation.lottoNumberOverlap()
      )
        return;
      const lottoNumbers = [...$$('[aria-label="win-number"]')].reduce(
        (a, b) => [...a, Number(b.value)],
        []
      );
      this.setStoreWinLottoNumber(lottoNumbers);
      this.setStoreLottoNumber(this.purchasedLottoNumbers);
      this.setStoreLottoBonusNumber(Number(this.$bonusNumberInput.value));
      $('.modal').classList.add('open');
    });
  }

  render() {
    const { price } = store.getState();
    if (price >= LOTTO_PRICE_MINIMUM)
      $('#lotto-num-form').classList.remove('display-none');
    else $('#lotto-num-form').classList.add('display-none');
    this.setLottoContainer();
  }

  template() {
    const { price } = store.getState();
    const lottoNumber = price / LOTTO_PRICE_MINIMUM;

    return `
    <section class="mt-9">
        <div class="d-flex">
        <label id="purchased-lotto" class="flex-auto my-0">총 ${lottoNumber}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
            <input type="checkbox" class="lotto-numbers-toggle-button" />
            <span class="text-base font-normal">번호보기</span>
            </label>
        </div>
        </div>
        <ul id="purcharsed-lottos" class="lotto-container d-flex flex-wrap"></ul>
    </section>
    <form class="mt-9">
        <label class="flex-auto d-inline-block mb-3"
        >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
        >
        <div class="d-flex">
        <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div class="lotto-winning-numbers">
            <input
                type="number"
                aria-label="win-number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                aria-label="win-number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                aria-label="win-number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                aria-label="win-number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                aria-label="win-number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                aria-label="win-number"
                class="winning-number mx-1 text-center"
            />
            </div>
        </div>
        <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="d-flex justify-center">
            <input type="number" aria-label="bonus-number" class="winning-number text-center" />
            </div>
        </div>
        </div>
        <button
        type="button"
        id="show-result-btn"
        class="open-result-modal-button mt-5 btn btn-cyan w-100"
        >
        결과 확인하기
        </button>
    </form>
    `;
  }
}

export default ShowLottoNumberSection;
