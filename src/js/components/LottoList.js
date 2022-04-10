import { $, addEvent } from '../utils/index.js';

class LottoList {
  constructor($target, $props) {
    this.$props = $props;
    this.$target = $target;
    this.setEvent();
  }

  setEvent() {
    const { handleSubmitLottoPrice } = this.$props;
    addEvent('submit', '#form-price', handleSubmitLottoPrice);
    addEvent('click', '.lotto-numbers-toggle-button', this.toggleLottoNumbersView);
  }

  toggleLottoNumbersView() {
    const $lottoListUl = $('#lotto-list ul');

    $lottoListUl.classList.toggle('open');
  }
}

export default LottoList;
