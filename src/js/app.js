// components
import PriceForm from './components/PriceForm.js';
import LottoSection from './components/LottoSection.js';
import LottoForm from './components/LottoForm.js';
import ResultModal from './components/ResultModal.js';

// model
import State from './model/State.js';

//classNames
import { PRICE_FORM, LOTTO_SECTION } from './constants/selectTarget.js';

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
              ${LottoForm()}
          </div>
        </div>
      </div>
    ${ResultModal()}
    `.trim();

  PriceForm($(PRICE_FORM, $app), { onSubmit: state.eventHandler.purchaseLotto });
  LottoSection($(LOTTO_SECTION, $app), { onSwitch: state.eventHandler.toggleDisplayLottoNumbers });

  $target.replaceWith($app);
}

export default App;
