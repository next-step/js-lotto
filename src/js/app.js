import { $ } from '../utils.js';
import InputPriceForm from './view/inputPriceForm.js';

class App {
  constructor($target, lotto) {
    this.lotto = lotto;
    this.$target = $target;
    new InputPriceForm($target, lotto);
    this.$lottoSwitch = $('#lotto-switch');
    this.$purchasedLottos = $('#purchased-lottos');
    this.$totalPurchased = $('#total-purchased');
    this.$inputLottoNumbers = $('#input-lotto-numbers');
    this.$lottoIcons = $('#lotto-icons');

    this.showPurchasedLottos = false;
    this.showLottoNumbers = false;

    this.initEventHandler();
    this.initRender();
  }

  handleLottoSwitchClick() {
    this.showLottoNumbers = !this.showLottoNumbers;
  }

  handleInputPriceChange(nextPrice) {
    const { setPrice } = this.lotto;

    setPrice(Number(nextPrice));
  }

  handleTargetClick(event) {
    const { target } = event;

    if (this.$lottoSwitch.contains(target)) {
      this.handleLottoSwitchClick();
      this.renderLottoNumbers();
    }
  }

  initEventHandler() {
    this.$target.addEventListener('click', (event) => {
      this.handleTargetClick(event);
    });
  }

  renderPurchasedLottos() {
    const { lottoCount, lottos } = this.lotto;

    if (this.showPurchasedLottos) {
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
      return;
    }

    this.$purchasedLottos.style.display = 'none';
  }

  renderLottoNumbers() {
    if (this.showLottoNumbers) {
      this.$lottoIcons.classList.add('flex-col');
      return;
    }

    this.$lottoIcons.classList.remove('flex-col');
  }

  renderInputLottoNumbers() {
    if (this.showPurchasedLottos) {
      this.$inputLottoNumbers.style.display = 'block';
      return;
    }

    this.$inputLottoNumbers.style.display = 'none';
  }

  initRender() {
    this.renderPurchasedLottos();
    this.renderLottoNumbers();
    this.renderInputLottoNumbers();
  }
}

export default App;
