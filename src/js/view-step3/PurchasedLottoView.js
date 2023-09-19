import { $ } from '../utils/dom';

export class PurchasedLottoView {
  #lottoIcons;
  #totalPurchased;
  #purchasedLottos;
  #lottoSwitch;

  constructor() {
    this.#lottoIcons = $('.lotto-icons');
    this.#totalPurchased = $('.total-purchased');
    this.#purchasedLottos = $('.purchased-lottos');
    this.#lottoSwitch = $('.lotto-switch');

    this.initialize();
  }

  initialize() {
    this.#purchasedLottos.style.display = 'none';
    this.#totalPurchased.innerHTML = '';
    while (this.#lottoIcons.firstChild) {
      this.#lottoIcons.removeChild(this.#lottoIcons.firstChild);
    }
  }

  setTotalPurchased(totalNumber) {
    this.#totalPurchased.innerHTML = `총 ${totalNumber}개를 구매하였습니다.`;
  }

  setLottoIcons(lottos, isWithNums = false) {
    while (this.#lottoIcons.firstChild) {
      this.#lottoIcons.removeChild(this.#lottoIcons.firstChild);
    }

    lottos.forEach((lotto) => {
      const lottoIcon = this.getLottoIconHtml();
      if (isWithNums) {
        lottoIcon.textContent += lotto.numbers;
      }
      this.#lottoIcons.appendChild(lottoIcon);
    });
  }

  getLottoIconHtml() {
    const lottoIcon = '🎟️ ';
    const lottoIconHtml = document.createElement('span');
    lottoIconHtml.innerHTML = lottoIcon;
    lottoIconHtml.classList.add('mx-1', 'text-4xl');

    return lottoIconHtml;
  }

  showPurchasedLottos() {
    this.#purchasedLottos.style.display = 'block';
  }

  get lottoSwitch() {
    return this.#lottoSwitch;
  }
}
