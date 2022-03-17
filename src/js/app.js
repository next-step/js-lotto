import PurchaseForm from './components/PurchaseForm.js';
import PurchaseSection from './components/PurchaseSection.js';
import { DOM } from './constants.js';
import Component from './core/Component.js';
import { $ } from './utils/dom.js';

class LottoApp extends Component {
  template() {
    return `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <form id="${DOM.purchaseForm}" class="mt-5"></form>
          <section id="${DOM.purchaseSection}" class="mt-9"></section>
        </div>
      </div>
    `;
  }

  mounted() {
    const $purchaseForm = $(`#${DOM.purchaseForm}`);
    const $purchaseSection = $(`#${DOM.purchaseSection}`);

    new PurchaseForm($purchaseForm);
    new PurchaseSection($purchaseSection);
  }
}

export default LottoApp;
