import { $ } from '../../utils.js';
import Controller from './controller.js';

class PurchasedLottoController extends Controller {
  constructor($target, lotto) {
    super($target, lotto);
    this.$lottoSwitch = $('#lotto-switch');
    this.$purchasedLottos = $('#purchased-lottos');
    this.$totalPurchased = $('#total-purchased');
    this.$lottoIcons = $('#lotto-icons');

    this.showLottoNumbers = false;
  }

  handleLottoSwitchClick() {
    this.showLottoNumbers = !this.showLottoNumbers;
  }

  addClickEvent({ target }) {
    if (this.$lottoSwitch.contains(target)) {
      this.handleLottoSwitchClick();
    }
  }

  renderPurchasedLottos() {
    const { lottoCount, lottos } = this.model;

    if (lottoCount > 0) {
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

export default PurchasedLottoController;
