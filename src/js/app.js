import WinningNumberForm from './components/WinningNumberForm.js';
import Modal from './components/Modal.js';
import PurchaseForm from './components/PurchaseForm.js';
import PurchaseSection from './components/PurchaseSection.js';
import { DOM, LOTTO } from './constants.js';
import { $ } from './utils/dom.js';
import { pickRandomNumbers } from './utils/index.js';

class LottoApp {
  constructor($target, props) {
    this.$target = $target;
    this.state = {
      lottoCount: 0,
      allLottoNumbers: [],
    };
    this.props = props;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {
    const $purchaseForm = $(`#${DOM.PURCHASE_FORM_ID}`);

    new PurchaseForm($purchaseForm, {
      setLottoCountAndNumbers: this.setLottoCountAndNumbers.bind(this),
      renderSection: this.renderSection.bind(this),
    });
  }

  setState(nextState) {
    this.state = { ...nextState };
    this.render();
  }

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

  setLottoCountAndNumbers(lottoCount) {
    const allLottoNumbers = Array.from({ length: lottoCount }, () =>
      pickRandomNumbers(LOTTO.START_NUMBER, LOTTO.END_NUMBER, LOTTO.NUMBER_COUNT),
    );

    this.setState({
      ...this.state,
      lottoCount,
      allLottoNumbers,
    });
  }

  renderSection() {
    const modal = new Modal($(`.${DOM.MODAL_CLASS}`), {
      restart: this.restart.bind(this),
    });
    new PurchaseSection($(`#${DOM.PURCHASE_SECTION_ID}`), {
      lottoCount: this.state.lottoCount,
      allLottoNumbers: this.state.allLottoNumbers,
    });
    new WinningNumberForm($(`#${DOM.WINNING_NUMBER_FORM_ID}`), {
      openModalWithResultAndYield: modal.openModalWithResultAndYield.bind(modal),
      allLottoNumbers: this.state.allLottoNumbers,
      lottoCount: this.state.lottoCount,
    });
  }

  restart() {
    this.setState({
      lottoCount: 0,
      allLottoNumbers: [],
    });
  }
}

export default LottoApp;
