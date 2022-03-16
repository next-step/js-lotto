import PriceForm from './components/PriceForm.js';
import LottoSection from './components/LottoSection.js';
import LottoForm from './components/LottoForm.js';
import ResultModal from './components/ResultModal.js';
function App($target) {
  const priceForm = new PriceForm();
  const lottoSection = new LottoSection();
  const lottoForm = new LottoForm();
  const resultModel = new ResultModal();

  $target.innerHTML = `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
            ${priceForm.getHtml()}
            ${lottoSection.getHtml()}
            ${lottoForm.getHtml()}
        </div>
      </div>
    ${resultModel.getHtml()}
    `;
  //
}

export default App;
