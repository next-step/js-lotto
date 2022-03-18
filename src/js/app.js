// components
import PriceForm from './components/PriceForm.js';
import LottoSection from './components/LottoSection.js';
import LottoForm from './components/LottoForm.js';
import ResultModal from './components/ResultModal.js';

const LOTTO_SECTION = 'lotto-section';

// models
import PriceModel from './model/PriceModel.js';
import LottoModel from './model/LottoModel.js';
import State from './model/State.js';
//classNames
const PRICE_FORM = 'price-form';

function App($target) {
  // model
  const priceModel = new PriceModel();

  // TODO: components
  const lottoForm = new LottoForm();
  const resultModal = new ResultModal();

  const $app = document.createElement('div');

  $app.innerHTML = `
      <div id="app" class="p-3">
        <div class="d-flex justify-center mt-5">
          <div class="w-100">
            <h1 class="text-center">🎱 행운의 로또</h1>
                <template class="${PRICE_FORM}"></template>
                <template class="mt-9 ${LOTTO_SECTION}"></template>
              ${lottoForm.getHtml()}
          </div>
        </div>
      </div>
    ${resultModal.getHtml()}
    `.trim();

  new PriceForm($app.querySelector(`.${PRICE_FORM}`), priceModel);
  new LottoSection($app.querySelector(`.${LOTTO_SECTION}`), priceModel);

  $target.replaceWith($app);
}

export default App;
