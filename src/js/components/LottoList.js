import { errorPrintAlert, validatePrice } from '../domains/errors.js';
import { $, addEvent } from '../utils/index.js';
import { hiddenEl, showEl } from '../view/common.js';

class LottoList {
  constructor($target, $props) {
    this.$props = $props;
    this.$target = $target;
    this.setEvent();
  }

  setEvent() {
    addEvent('submit', '#form-price', this.handleSubmitLottoPrice);
    addEvent('click', '.lotto-numbers-toggle-button', this.toggleLottoNumbersView);
  }

  toggleLottoNumbersView() {
    const $lottoListUl = $('#lotto-list ul');

    $lottoListUl.classList.toggle('open');
  }

  updateView() {
    showEl($('#lotto-manual-purchase'));
  }

  reset() {
    hiddenEl($('#lotto-manual-purchase'));
    $('#form-price').reset();
  }

  setPriceState(e) {
    const price = e.target['price'].valueAsNumber;
    const { errorMsg } = validatePrice(price);
    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    this.$props.store.setState({ price });
  }

  handleSubmitLottoPrice = (e) => {
    e.preventDefault();

    this.setPriceState(e);
    this.updateView();
  };
}

export default LottoList;
