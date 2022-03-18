// components
import PriceForm from './components/PriceForm.js';
import LottoSection from './components/LottoSection.js';
import LottoForm from './components/LottoForm.js';
import ResultModal from './components/ResultModal.js';

// model
import State from './model/State.js';

//classNames
import { PRICE_FORM, LOTTO_SECTION } from './constants/selectTarget.js';

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
              ${LottoForm.getHtml()}
          </div>
        </div>
      </div>
    ${ResultModal.getHtml()}
    `.trim();

  new PriceForm($app.querySelector(`.${PRICE_FORM}`), { onSubmit: state.eventHandler.PURCHASE });
  new LottoSection($app.querySelector(`.${LOTTO_SECTION}`), state.priceModel);

  $target.replaceWith($app);
}

export default App;
