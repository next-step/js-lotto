import { $, hideElement, removeAllChild, showElement } from '../utils/dom';

export class PurchasedLottoView {
  #lottoIcons;
  #totalPurchased;
  #purchasedLottos;
  #lottoNumbersToggleBtn;

  constructor() {
    this.#lottoIcons = $('.lotto-icons');
    this.#totalPurchased = $('.total-purchased');
    this.#purchasedLottos = $('.purchased-lottos');
    this.#lottoNumbersToggleBtn = $('.lotto-switch');

    this.initialize();
  }

  initialize() {
    this.#totalPurchased.innerHTML = '';
    hideElement(this.#purchasedLottos);
    removeAllChild(this.#lottoIcons);
  }

  setTotalPurchased(totalNumber) {
    this.#totalPurchased.innerHTML = `총 ${totalNumber}개를 구매하였습니다.`;
  }

  setLottoIcons(lottos, isWithNums) {
    removeAllChild(this.#lottoIcons);

    lottos.forEach((lotto) => {
      this.#lottoIcons.appendChild(this.getLottoIconHtml(lotto, isWithNums));
    });
  }

  getLottoIconHtml(lotto, isWithNums) {
    const lottoIcon = '🎟️ ';
    const lottoIconHtml = document.createElement('span');
    lottoIconHtml.innerHTML = lottoIcon;
    lottoIconHtml.classList.add('mx-1', 'text-4xl');

    if (isWithNums) {
      lottoIconHtml.classList.add('lotto-numbers');
      lottoIconHtml.textContent += lotto.numbers;
    }

    return lottoIconHtml;
  }

  showPurchasedLottos() {
    showElement(this.#purchasedLottos);
  }

  get lottoNumbersToggleBtn() {
    return this.#lottoNumbersToggleBtn;
  }
}
