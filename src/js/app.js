import PurchaseForm from './components/PurchaseForm.js';
import PurchaseSection from './components/PurchaseSection.js';
import { DOM } from './constants.js';
import Component from './core/Component.js';
import { $ } from './utils/dom.js';

class LottoApp extends Component {
  template() {
    return `
      <div class="d-flex justify-center mt-5">
        <div class="${DOM.purchaseContainer} w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
        </div>
      </div>
    `;
  }

  mounted() {
    const $purchaseContainer = $(`.${DOM.purchaseContainer}`);

    new PurchaseForm($purchaseContainer);
    new PurchaseSection($purchaseContainer);
  }
}

export default LottoApp;
