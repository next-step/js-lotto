import Component from '../core/Component.js';
import Lotto from './Lotto.js';
import { store } from '../store/store.js';
import { TOGGLE_IS_SHOW_NUMBER } from '../store/actions.js';
import { $, $$ } from '../utils/dom.js';
import { LOTTO_NUMBER_MAX, LOTTO_NUMBER_MIN } from '../utils/constants.js';

class ShowLottoNumberSection extends Component {
  isShow = false;

  constructor(target) {
    super(target);
    this.render();
  }

  setElements() {
    this.$lottoContainer = $('.lotto-container', this.$target);
  }

  setLottoContainer() {
    $('.lotto-container').innerHTML = '';
    const getLottoNumber = () => {
      return parseInt(
        Math.random() * (LOTTO_NUMBER_MAX - LOTTO_NUMBER_MIN) + LOTTO_NUMBER_MIN
      );
    };

    const createOneLotto = () => {
      const lotto = [];
      while (lotto.length !== 6) {
        const randomNumber = getLottoNumber();
        if (lotto.includes(randomNumber)) {
          continue;
        }

        lotto.push(randomNumber);
      }

      return lotto;
    };

    const { price } = store.getState();
    const lottoNumber = price / 1000;

    new Array(lottoNumber).fill(0).forEach((_) => {
      const lotto = createOneLotto();
      const lottoComponent = Lotto(lotto);
      $('.lotto-container').appendChild(lottoComponent);
    });
  }

  setEvents() {
    $('.lotto-numbers-toggle-button').addEventListener('change', (event) => {
      this.isShow = event.target.checked;
      console.log(this.isShow);
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
  }

  render() {
    const { price } = store.getState();
    if (price > 1000) $('#lotto-num-form').classList.remove('display-none');
    this.setLottoContainer();
  }

  template() {
    const { price, isShow } = store.getState();
    console.log(isShow);
    const lottoNumber = price / 1000;

    return `
    <section class="mt-9">
        <div class="d-flex">
        <label id="purchased-lotto" class="flex-auto my-0">총 ${lottoNumber}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
            <input type="checkbox" class="lotto-numbers-toggle-button" data-action=${TOGGLE_IS_SHOW_NUMBER} />
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
            <div>
            <input
                type="number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                class="winning-number mx-1 text-center"
            />
            <input
                type="number"
                class="winning-number mx-1 text-center"
            />
            </div>
        </div>
        <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="d-flex justify-center">
            <input type="number" class="bonus-number text-center" />
            </div>
        </div>
        </div>
        <button
        type="button"
        class="open-result-modal-button mt-5 btn btn-cyan w-100"
        >
        결과 확인하기
        </button>
    </form>
    `;
  }
}

export default ShowLottoNumberSection;
