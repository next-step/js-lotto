import { DEFAULT_NUMBER } from '../../const.js';
import { $ } from '../../utils.js';
import View from './view.js';

class PurchasedLottoView extends View {
  constructor($target) {
    super($target);
    this.$lottoSwitch = $('#lotto-switch');
    this.$purchasedLottos = $('#purchased-lottos');
    this.$totalPurchased = $('#total-purchased');
    this.$lottoIcons = $('#lotto-icons');
  }

  renderPurchasedLottos({ lottoCount, lottos }) {
    if (lottoCount > DEFAULT_NUMBER) {
      this.$purchasedLottos.style.display = 'block';
      this.$totalPurchased.innerText = lottoCount;
      this.$lottoIcons.innerHTML = lottos
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
    if (this.$lottoSwitch.checked) {
      this.$lottoIcons.classList.add('flex-col');
      return;
    }

    this.$lottoIcons.classList.remove('flex-col');
  }

  render({ lottoCount, lottos }) {
    this.renderPurchasedLottos({ lottoCount, lottos });
    this.renderLottoNumbers();
  }
}

export default PurchasedLottoView;
