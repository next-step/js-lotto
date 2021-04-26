import { $, $$ } from './utils/dom.js';
import { getRandomInt } from './utils/random.js';

const PRICE_PER_LOTTO = 1000;

export class Lottos {
  constructor() {
    this.lottos = [];
    this.$container = $('#purchased-lottos');
    this.$lottoSwitch = $('#lotto-switch');
    this.$numOfLotto = $('#total-purchased');
    this.initEventListener();
  }

  setState({ price }) {
    const numOfLotto = price / PRICE_PER_LOTTO;
    this.lottos = Array.from({ length: numOfLotto }, () => Lottos.generateLotto());
    this.render();
  }

  initEventListener() {
    this.$lottoSwitch.addEventListener('change', Lottos.handleToggle);
  }

  static handleToggle() {
    const lottoNumbers = $$('.lotto-numbers');
    lottoNumbers.forEach((element) => {
      element.classList.toggle('d-none');
    });
  }

  render() {
    this.$container.hidden = false;
    this.$numOfLotto.textContent = this.lottos.length;
    this.$container.insertAdjacentHTML('beforeend', `
    <ul class="d-flex flex-wrap">
      ${this.lottos.reduce((html, numbers) => `${html}
        <li class="mx-1 d-flex"> 
          <span class="mr-4 text-4xl"> 🎟️ </span>
          <span class="lotto-numbers text-xl d-none">${numbers.join(', ')}</span>
        </li>
      `, '')}
    </ul>
    `);
  }

  static generateLotto() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
      const number = getRandomInt(1, 45);
      lottoNumbers.add(number);
    }
    return [...lottoNumbers];
  }
}
