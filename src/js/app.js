// components
import PriceForm from './components/PriceForm.js';
import LottoSection from './components/LottoSection.js';
import LottoForm from './components/LottoForm.js';
import ResultModal from './components/ResultModal.js';

// models
import PriceModel from './model/PriceModel.js';

//classNames
const PRICE_FORM = 'price-form';

function App($target) {
  const lottoSection = new LottoSection();
  const lottoForm = new LottoForm();
  const resultModel = new ResultModal();

  const priceModel = new PriceModel();

  const $app = document.createElement('div');

  $app.innerHTML = `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
              <form class="${PRICE_FORM}"></form>
              ${lottoSection.getHtml()}
            ${lottoForm.getHtml()}
        </div>
      </div>
    ${resultModel.getHtml()}
    `.trim();

  new PriceForm($app, priceModel);

  $target.appendChild($app.firstChild);
}

export default App;
