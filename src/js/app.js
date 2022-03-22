import WinningNumberForm from './components/WinningNumberForm.js';
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
          <form id="${DOM.PURCHASE_FORM_ID}" class="mt-5"></form>
          <section id="${DOM.PURCHASE_SECTION_ID}" class="mt-9"></section>
          <form id="${DOM.WINNING_NUMBER_FORM_ID}" class="mt-9"></form>
        </div>
      </div>
      <div class="${DOM.MODAL_CLASS}"></div>
    `;
  }

  setUp() {
    this.state = {
      lottoCount: 0,
      allLottoNumbers: [],
    };
  }

  mounted() {
    const $purchaseForm = $(`#${DOM.PURCHASE_FORM_ID}`);

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
    const $purchaseSection = $(`#${DOM.PURCHASE_SECTION_ID}`);
    const $winningNumberForm = $(`#${DOM.WINNING_NUMBER_FORM_ID}`);
    const $modal = $(`.${DOM.MODAL_CLASS}`);

    const modal = new Modal($modal, {});
    new PurchaseSection($purchaseSection, {
      lottoCount: this.state.lottoCount,
      allLottoNumbers: this.state.allLottoNumbers,
    });
    new WinningNumberForm($winningNumberForm, {
      openModal: modal.openModal,
    });
  }
}

export default LottoApp;
