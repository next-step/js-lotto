class App {
  constructor($target, lotto) {
    this.lotto = lotto;
    this.$target = $target;
    this.$inputPrice = $target.querySelector('#input-price');
    this.$inputPriceButton = $target.querySelector('#input-price-btn');
    this.$lottoSwitch = $target.querySelector('#lotto-switch');

    this.showPurchasedLottos = false;
    this.showLottoNumbers = false;
    this.showInputLottoNumbers = false;

    this.initEventHandler();
    this.initRender();
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
      this.initRender();
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

  renderPurchasedLottos() {
    const { getLottoCount } = this.lotto;
    const $purchasedLottos = this.$target.querySelector('#purchased-lottos');
    const $totalPurchased = this.$target.querySelector('#total-purchased');

    if (this.showPurchasedLottos) {
      $purchasedLottos.style.display = 'block';
      $totalPurchased.innerText = getLottoCount();
      return;
    }

    $purchasedLottos.style.display = 'none';
  }

  renderLottoNumbers() {
    const { getLottos } = this.lotto;
    const $lottoIcons = this.$target.querySelector('#lotto-icons');

    if (this.showLottoNumbers) {
      $lottoIcons.classList.add('flex-col');
      $lottoIcons.innerHTML = getLottos()
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

    $lottoIcons.classList.remove('flex-col');
    $lottoIcons.innerHTML = getLottos()
      .map(
        () =>
          `<li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️</span>
      </li>`
      )
      .join('');
  }

  renderInputLottoNumbers() {
    const $inputLottoNumbers = this.$target.querySelector(
      '#input-lotto-numbers'
    );

    if (this.showPurchasedLottos) {
      $inputLottoNumbers.style.display = 'block';
      return;
    }

    $inputLottoNumbers.style.display = 'none';
  }

  initRender() {
    this.renderPurchasedLottos();
    this.renderLottoNumbers();
    this.renderInputLottoNumbers();
  }
}

export default App;
