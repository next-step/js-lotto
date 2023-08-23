import { LottoOutput } from '../view/LottoOutput.js';
import { SELECTOR } from '../constants/index.js';

export class LottoMachine {
  constructor(app, count) {
    this.lottoCount = app.querySelector(SELECTOR.LOTTO_COUNT);
    this.lottoList = app.querySelector(SELECTOR.LOTTO_LIST);
    this.lottoToggle = app.querySelector(SELECTOR.LOTTO_TOGGLE);
    this.lottoToggleWrapper = app.querySelector(SELECTOR.LOTTO_TOGGLE_WRAPPER);
    this.lottoSection = app.querySelector(SELECTOR.LOTTO_SECTION);

    this.count = count;
    this.output = LottoOutput;
    this.lottos = Array.from({ length: count }, () => this.issueLotto());

    this.render();
  }

  render() {
    this.lottoCount.innerHTML = `총 ${this.count}개를 구매했습니다.`;
    this.lottoToggleWrapper.classList.remove('hidden');
    this.lottos.forEach((lotto) => (this.lottoList.innerHTML += this.output.LOTTO_TICKET(lotto)));
    this.lottoSection.classList.remove('hidden');
  }

  issueLotto() {
    let lottoNumbers = [];
    while (lottoNumbers.length < 6) {
      let number = Math.floor(Math.random() * 45) + 1;
      if (!lottoNumbers.includes(number)) {
        lottoNumbers.push(number);
      }
    }
    return lottoNumbers;
  }
}
