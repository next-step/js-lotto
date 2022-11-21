import { DEFAULT_LOTTO_COUNT } from '../../const.js';
import { $ } from '../../utils.js';
import View from './view.js';

class PurchasedLottoView extends View {
  constructor($target) {
    super($target);
    this.$lottoSwitch = $('#lotto-switch');
    this.$purchasedLottos = $('#purchased-lottos');
    this.$totalPurchased = $('#total-purchased');
    this.$lottoIcons = $('#lotto-icons');
    this.$inputPriceButton = $('#input-price-btn');
    this.lottos = [];
    this.lottoCount = DEFAULT_LOTTO_COUNT;

    this.showLottoNumbers = false;
  }

  renderPurchasedLottos() {
    if (this.lottoCount > DEFAULT_LOTTO_COUNT) {
      this.$purchasedLottos.style.display = 'block';
      this.$totalPurchased.innerText = this.lottoCount;
      this.$lottoIcons.innerHTML = this.lottos
        .map(
          (lotto) =>
            `<li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️ </span>
        <span class="lotto-detail">${lotto.join(',')}</span>
        </li>`
        )
        .join('');
    }
  }

  renderLottoNumbers() {
    if (this.showLottoNumbers) {
      this.$lottoIcons.classList.add('flex-col');
      return;
    }

    this.$lottoIcons.classList.remove('flex-col');
  }

  render() {
    this.renderPurchasedLottos();
    this.renderLottoNumbers();
  }
}

export default PurchasedLottoView;
