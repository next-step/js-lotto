import { LOTTO, LOTTO_NUMBER_UNIT, RANKING } from '../constants.js';
import { calculatedRevenueRate } from '../calculation.js';

class Lotto {
  constructor(lottoWrapperList) {
    this.lottoWrapperList = lottoWrapperList;
    this.lottoNumbers = [];
    this.score = {};
  }

  toggleLottoList() {
    this.lottoWrapperList.classList.toggle('flex-col');
  }

  hiddenLottoList() {
    this.lottoWrapperList.classList.remove('flex-col');
  }

  createRandomNumber() {
    const { min, max } = LOTTO_NUMBER_UNIT;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createLotto() {
    const lottoSet = new Set();

    while (lottoSet.size < LOTTO.SIZE) {
      lottoSet.add(this.createRandomNumber());
    }

    return [...lottoSet].sort((a, b) => a - b);
  }

  createLottoList(dividedLottoCount) {
    for (let i = 0; i < dividedLottoCount; i++) {
      this.lottoNumbers.push(this.createLotto());
    }
    return this.lottoNumbers;
  }

  getLottoRandomNumbers() {
    return this.lottoNumbers;
  }

  renderCreatedLottoList() {
    const fragment = document.createDocumentFragment();

    this.lottoNumbers.forEach((lottoNumbers) => {
      const iconWrapper = document.createElement('li');
      const lottoIcon = document.createElement('span');
      const lottoDetail = document.createElement('span');

      iconWrapper.classList.add('lotto-wrapper', 'd-flex', 'items-center');
      lottoIcon.textContent = '🎟 ';
      lottoIcon.classList.add('lotto-icon', 'mx-1', 'text-4xl');
      lottoDetail.textContent = lottoNumbers.join(', ');
      lottoDetail.classList.add('lotto-detail', 'text-xl');

      iconWrapper.appendChild(lottoIcon);
      iconWrapper.appendChild(lottoDetail);
      fragment.appendChild(iconWrapper);
    });

    this.lottoWrapperList.appendChild(fragment);
  }

  setScore(winningNumbers, bonusNumbers) {
    winningNumbers.forEach((number) => {
      this.score[number] = LOTTO.WINNING_NUMBER_SCORE;
    });
    bonusNumbers.forEach((number) => {
      this.score[number] = LOTTO.BONUS_NUMBER_SCORE;
    });
  }

  addScore(lotto) {
    let sum = 0;
    lotto.forEach((number) => {
      sum += this.score[number] ?? 0;
    });
    return sum;
  }

  getLottoRankingObject() {
    const rank = {};
    const lottoScoreArray = this.lottoNumbers.map((lotto) => this.addScore(lotto));
    lottoScoreArray.forEach((score) => {
      const { place } = RANKING[score] ?? rank;
      if (place) {
        rank[place] = (rank[place] ?? 0) + 1;
      }
    });
    return rank;
  }

  getRevenueRate() {
    let revenue = 0;
    const lottoScoreArray = this.lottoNumbers.map((lotto) => this.addScore(lotto));
    lottoScoreArray.forEach((score) => {
      const { price } = RANKING[score] ?? revenue;
      if (price) {
        revenue += price;
      }
    });
    const price = this.lottoNumbers.length * LOTTO.UNIT;
    return `당신의 총 수익률은 ${calculatedRevenueRate(revenue, price)}%입니다.`;
  }

  resetLottoData() {
    this.lottoNumbers = [];
    this.score = {};
    this.hiddenLottoList();
    while (this.lottoWrapperList.hasChildNodes()) {
      this.lottoWrapperList.removeChild(this.lottoWrapperList.firstChild);
    }
  }
}

export default Lotto;
