export class PurchasedLottoResultView {
  #purchaseResultElement;

  #purchaseLottoListElement;

  #showLottoNumbersToggleButtonElement;

  #winningCloseElement;

  #winningModalElement;

  constructor() {
    this.#purchaseResultElement = document.querySelector('section.mt-9');
    this.#showLottoNumbersToggleButtonElement = document.querySelector(
      '.lotto-numbers-toggle-button'
    );
    this.#purchaseLottoListElement = this.#purchaseResultElement.querySelector(
      'div.d-flex.flex-wrap'
    );
    this.#winningCloseElement = document.querySelector('.modal-close');
    this.#winningModalElement = document.querySelector('.modal');
    this.#eventBinding();
  }

  #isShowLottoNumbers() {
    return this.#showLottoNumbersToggleButtonElement.checked;
  }

  #hidePurchasedLottoResult() {
    this.#purchaseResultElement.style.visibility = 'hidden';
  }

  #showPurchasedLottoResult() {
    this.#purchaseResultElement.style.visibility = 'visible';
  }

  #handleToggleShowLottoNumbers() {
    if (this.#isShowLottoNumbers()) {
      this.#showPurchasedLottoResult();
      return;
    }

    this.#hidePurchasedLottoResult();
  }

  changePurchaseResult(lottos) {
    console.log(this.#showLottoNumbersToggleButtonElement);
  }

  #eventBinding() {
    this.#showLottoNumbersToggleButtonElement.addEventListener(
      'click',
      this.#handleToggleShowLottoNumbers
    );
  }

  initial() {
    this.#hidePurchasedLottoResult();
  }
}
