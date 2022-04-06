import { $, addEvent } from '../utils/index.js';
import { getLottoPriceTemplate } from './Template.js';

class LottoPrice {
  constructor($target, $props) {
    this.$props = $props;
    this.$target = $target;
    this.setEvent();

    $target.innerHTML = getLottoPriceTemplate($props.store.state);
  }

  setEvent() {
    const { buyLotto } = this.$props;
    addEvent('submit', '#form-price', (e) => {
      buyLotto(e);
      this.render();
    });
    addEvent('click', '.lotto-numbers-toggle-button', this.toggleLottoNumbersView);
  }

  render() {
    $('#form-winning').classList.toggle('hidden');
    this.$target.innerHTML = getLottoPriceTemplate(this.$props.store.state);
  }

  toggleLottoNumbersView() {
    const lottoDetails = document.querySelectorAll('#lotto-list li span.lotto-detail');

    lottoDetails.forEach(($lottoDetail) => $lottoDetail.classList.toggle('none'));
  }
}

export default LottoPrice;
