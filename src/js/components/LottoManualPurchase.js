import { getLottoAmount } from '../domains/index.js';
import { $, addEvent } from '../utils/index.js';
import { getLottoManualPurchaseItemTemplate, getLottoPriceTemplate } from './Template.js';

class LottoManualPurchase {
  constructor($target, $props) {
    this.$props = $props;
    this.$target = $target;
    this.setEvent();
  }

  setEvent() {
    const { handleSubmitPurchaseLotto } = this.$props;

    addEvent('click', '#lotto-manual-purchase button[type="button"]', ({ target }) => {
      if (target.classList.contains('delete-btn')) {
        this.deleteManualPurchaseItem(target);
      }
      if (target.classList.contains('manual-purchase-btn')) {
        this.addManualPurchaseItem();
      }
      return;
    });
    addEvent('submit', '#lotto-manual-purchase', (e) => {
      handleSubmitPurchaseLotto(e);
      this.render();
    });
  }

  deleteManualPurchaseItem(target) {
    const $Item = target.closest('li');
    const $manualPurchaseBtn = $('.manual-purchase-btn');

    $Item?.remove();
    if ($manualPurchaseBtn.disabled) {
      $manualPurchaseBtn.disabled = false;
    }
  }

  addManualPurchaseItem() {
    const { state } = this.$props.store;
    const maxAmount = getLottoAmount(state.price);
    const itemLength = document.querySelectorAll('ul#lotto-manual-list li').length;

    if (itemLength + 1 >= maxAmount) {
      $('.manual-purchase-btn').disabled = true;
    }

    $('ul#lotto-manual-list').insertAdjacentHTML('beforeend', getLottoManualPurchaseItemTemplate());
  }

  render() {
    $('#lotto-list-container').innerHTML = getLottoPriceTemplate(this.$props.store.state);
  }
}

export default LottoManualPurchase;
