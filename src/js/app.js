class App {
  constructor($target, lotto) {
    this.$target = $target;

    this.$inputPrice = $target.querySelector('#input-price');
    this.$inputPriceButton = $target.querySelector('#input-price-btn');
    this.$totalPurchased = $target.querySelector('#total-purchased');
    this.$lottoSwitch = $target.querySelector('#lotto-switch');
    this.$lottoIcons = $target.querySelector('#lotto-icons');
    this.$purchasedLottos = $target.querySelector('#purchased-lottos');
    this.$inputLottoNumbers = $target.querySelector('#input-lotto-numbers');

    this.lotto = lotto;
    this.showPurchasedLottos = false;
    this.showLottoNumbers = false;
    this.showInputLottoNumbers = false;
    this.initEventHandler();
    this.initRender();
  }

  renderPurchasedLottos() {
    const { getLottoCount } = this.lotto;

    if (this.showPurchasedLottos) {
      this.$purchasedLottos.style.display = 'block';
      this.$inputLottoNumbers.style.display = 'block';
      this.$totalPurchased.innerText = getLottoCount();
      return;
    }

    this.$purchasedLottos.style.display = 'none';
    this.$inputLottoNumbers.style.display = 'none';
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

  handleLottoSwitchClick() {
    this.showLottoNumbers = !this.showLottoNumbers;
  }

  handleInputPriceButtonClick() {
    const { validatePrice, registerLotto } = this.lotto;

    /**
     * @todo
     * 에러에 따른 알림
     */
    if (validatePrice()) {
      registerLotto();
      this.showPurchasedLottos = true;
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

    if (this.$inputPriceButton.contains(target)) {
      this.handleInputPriceButtonClick();
      this.renderPurchasedLottos();
      this.renderLottoNumbers();
      return;
    }
    if (this.$lottoSwitch.contains(target)) {
      this.handleLottoSwitchClick();
      this.renderLottoNumbers();
      return;
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

  initRender() {
    this.renderPurchasedLottos();
    this.renderLottoNumbers();
  }
}

export default App;
