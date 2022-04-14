import { errorPrintAlert, validateManualLottoList } from '../domains/errors.js';
import { createLottoList, getLottoAmount, getManualLottoList } from '../domains/index.js';
import { $, addEvent } from '../utils/index.js';
import { hiddenEl, showEl } from '../view/common.js';
import { getLottoManualPurchaseItemTemplate, getLottoPriceTemplate } from './Template.js';

class LottoManualPurchase {
  constructor($target, $props) {
    this.$props = $props;
    this.$target = $target;
    this.setEvent();
  }

  setEvent() {
    addEvent('click', '#lotto-manual-purchase button.delete-btn', this.deleteManualPurchaseItem);
    addEvent('click', '#lotto-manual-purchase button.manual-purchase-btn', this.addManualPurchaseItem);
    addEvent('submit', '#lotto-manual-purchase', this.handleSubmitPurchaseLotto);
    addEvent('input', '#lotto-manual-list', this.handleChangeInput);
  }

  handleChangeInput({ target }) {
    const value = target.value;
    const index = Number(target.dataset.manualNumberIndex);

    if (value.length > 1) {
      document.querySelector(`[data-manual-number-index='${index + 1}']`)?.focus();
    }
  }

  deleteManualPurchaseItem({ target }) {
    const $Item = target.closest('li');
    const $manualPurchaseBtn = $('.manual-purchase-btn');

    $Item?.remove();
    if ($manualPurchaseBtn.disabled) {
      $manualPurchaseBtn.disabled = false;
    }
  }

  addManualPurchaseItem = () => {
    const { state } = this.$props.store;
    const maxAmount = getLottoAmount(state.price);
    const itemLength = document.querySelectorAll('ul#lotto-manual-list li').length;

    if (itemLength + 1 >= maxAmount) {
      $('.manual-purchase-btn').disabled = true;
    }

    $('ul#lotto-manual-list').insertAdjacentHTML('beforeend', getLottoManualPurchaseItemTemplate());
  };

  updateView() {
    $('#lotto-list-container').innerHTML = getLottoPriceTemplate(this.$props.store.state);

    showEl($('#form-winning'));

    $('#form-price input').disabled = true;
    $('#form-price button').disabled = true;

    document.querySelectorAll('#lotto-manual-purchase button').forEach(($button) => {
      $button.disabled = true;
    });
    document.querySelectorAll('#lotto-manual-purchase input').forEach(($input) => {
      $input.disabled = true;
    });
  }

  reset() {
    $('#lotto-list-container').innerHTML = getLottoPriceTemplate(this.$props.store.state);

    hiddenEl($('#form-winning'));

    $('#form-price input').disabled = false;
    $('#form-price button').disabled = false;

    document.querySelectorAll('#lotto-manual-purchase button').forEach(($button) => {
      $button.disabled = false;
    });
    document.querySelectorAll('#lotto-manual-purchase input').forEach(($input) => {
      $input.disabled = false;
    });
  }

  setLottoListState(e) {
    const { state, setState } = this.$props.store;
    const manualLottoList = getManualLottoList(e.target['manual-number']);
    const { errorMsg } = validateManualLottoList(manualLottoList);
    const autoLottoCount = getLottoAmount(state.price) - manualLottoList.length;
    const autoLottoList = autoLottoCount ? createLottoList(autoLottoCount) : [];

    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    setState({ lottoList: [...autoLottoList, ...manualLottoList] });
  }

  handleSubmitPurchaseLotto = (e) => {
    e.preventDefault();

    this.setLottoListState(e);
    this.updateView();
  };
}

export default LottoManualPurchase;
