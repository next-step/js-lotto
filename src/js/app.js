import LottoWinningNumberForm from './components/LottoWinningNumberForm.js';
import Modal from './components/Modal.js';
import PurchaseForm from './components/PurchaseForm.js';
import PurchaseSection from './components/PurchaseSection.js';
import { DOM, LOTTO } from './constants.js';
import Component from './core/Component.js';
import { $ } from './utils/dom.js';
import { pickRandomNumbers } from './utils/index.js';

class LottoApp extends Component {
  template() {
    return String.raw`
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <form id="${DOM.PURCHASE_FORM}" class="mt-5"></form>
          <section id="${DOM.PURCHASE_SECTION}" class="mt-9"></section>
          <form id="${DOM.LOTTO_WINNING_NUMBER_FORM}" class="mt-9"></form>
        </div>
      </div>
      <div class="${DOM.MODAL}"></div>
    `;
  }

  setUp() {
    this.state = {
      lottoCount: 0,
      allLottoNumbers: [],
    };
  }

  mounted() {
    const $purchaseForm = $(`#${DOM.PURCHASE_FORM}`);

    new PurchaseForm($purchaseForm, {
      setLottoCountAndNumbers: this.setLottoCountAndNumbers.bind(this),
      renderSection: this.renderSection.bind(this),
    });
  }

  setLottoCountAndNumbers(lottoCount) {
    const allLottoNumbers = [];

    for (let i = 0; i < lottoCount; i += 1) {
      allLottoNumbers.push(
        pickRandomNumbers(LOTTO.START_NUMBER, LOTTO.END_NUMBER, LOTTO.NUMBER_COUNT),
      );
    }

    this.setState({
      ...this.state,
      lottoCount,
      allLottoNumbers,
    });
  }

  renderSection() {
    const $purchaseSection = $(`#${DOM.PURCHASE_SECTION}`);
    const $lottoWinningNumberForm = $(`#${DOM.LOTTO_WINNING_NUMBER_FORM}`);
    const $modal = $(`.${DOM.MODAL}`);

    new PurchaseSection($purchaseSection, {
      lottoCount: this.state.lottoCount,
      allLottoNumbers: this.state.allLottoNumbers,
    });
    new LottoWinningNumberForm($lottoWinningNumberForm, {});
    new Modal($modal, {});
  }
}

export default LottoApp;
