// components
import PriceForm from './components/PriceForm.js';
import LottoSection from './components/LottoSection.js';
import LottoForm from './components/LottoForm.js';
import ResultModal from './components/ResultModal.js';

// model
import State from './model/State.js';

//classNames
import { PRICE_FORM, LOTTO_SECTION, LOTTO_FORM, LOTTO_MODAL } from './constants/selectTarget.js';

import { $ } from './util/dom.js';

function App($target) {
  const state = new State();

  const $app = document.createElement('div');

  $app.innerHTML = `
      <div id="app" class="p-3">
        <div class="d-flex justify-center mt-5">
          <div class="w-100">
            <h1 class="text-center">🎱 행운의 로또</h1>
                <template class="${PRICE_FORM}"></template>
                <template class="mt-9 ${LOTTO_SECTION}"></template>
                <template class="mt-9 ${LOTTO_FORM}"></template>
          </div>
        </div>
      </div>
    <template class="${LOTTO_MODAL}"></template>
    `.trim();

  PriceForm($(PRICE_FORM, $app), { purchaseLotto: state.purchaseLotto });
  LottoSection($(LOTTO_SECTION, $app), { toggleDisplay: state.toggleDisplayLottoNumbers });
  LottoForm($(LOTTO_FORM, $app), {
    displayResult: state.displayWinningResultModal,
  });
  ResultModal($(LOTTO_MODAL, $app), {
    closeModal: state.closeWinningResultModal,
    reStart: state.initLotto,
  });

  $target.replaceWith($app);
}

export default App;
