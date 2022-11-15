import { $ } from '../utils.js';

class App {
  constructor($target, lotto) {
    this.lotto = lotto;
    this.$target = $target;
    this.$inputPrice = $('#input-price');
    this.$inputPriceButton = $('#input-price-btn');
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

  handleInputPriceButtonClick() {
    const { getErrorMessage, registerLotto } = this.lotto;

    const message = getErrorMessage();

    if (message === '') {
      registerLotto();
      this.showPurchasedLottos = true;
    } else {
      window.alert(message);
    }
  }

  handleInputPriceChange(nextPrice) {
    const { setPrice } = this.lotto;

    setPrice(Number(nextPrice));
  }

  handleTargetChange = (event) => {
    const { target } = event;

    if (this.$inputPrice.contains(target)) {
      this.handleInputPriceChange(target.value);
      return;
    }
  };

  handleTargetClick = (event) => {
    const { target } = event;

    console.log(target);
    if (this.$inputPriceButton.contains(target)) {
      this.handleInputPriceButtonClick();
      this.initRender();
      return;
    }

    if (this.$lottoSwitch.contains(target)) {
      this.handleLottoSwitchClick();
      this.renderLottoNumbers();
    }
  };

  initEventHandler() {
    this.$target.addEventListener('click', (event) => {
      this.handleTargetClick(event);
    });
    this.$target.addEventListener('input', (event) => {
      this.handleTargetChange(event);
    });
  }

  renderPurchasedLottos() {
    const { getLottoCount } = this.lotto;

    if (this.showPurchasedLottos) {
      this.$purchasedLottos.style.display = 'block';
      this.$totalPurchased.innerText = getLottoCount();
      return;
    }

    this.$purchasedLottos.style.display = 'none';
  }

  renderLottoNumbers() {
    const { getLottos } = this.lotto;

    if (this.showLottoNumbers) {
      this.$lottoIcons.classList.add('flex-col');
      this.$lottoIcons.innerHTML = getLottos()
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

    this.$lottoIcons.classList.remove('flex-col');
    this.$lottoIcons.innerHTML = getLottos()
      .map(
        () =>
          `<li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️</span>
      </li>`
      )
      .join('');
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
