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
    });
    addEvent('submit', '#lotto-manual-purchase', handleSubmitPurchaseLotto);
    addEvent('input', '#lotto-manual-list', this.changeInput);
  }

  changeInput({ target }) {
    const value = target.value;
    const index = Number(target.dataset.manualNumberIndex);

    if (value.length > 1) {
      document.querySelector(`[data-manual-number-index='${index + 1}']`)?.focus();
    }
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
