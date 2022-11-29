import { PRIZE_FOR_PLACE } from '../constants.js';

export default class LottoStateModel {
  purchasedAmount = 0;
  quantity = 0;
  lottos = [];
  places = {
    place1: 0,
    place2: 0,
    place3: 0,
    place4: 0,
    place5: 0,
  };

  constructor() {}

  getLottoNumbers() {
    return this.lottos.map((lotto) => lotto.winningNumbers);
  }

  drawLotto(winningNumbers, bonusNumber) {
    this.#resetPlaces();
    const bonusNum = bonusNumber[0];
    const lottos = this.getLottoNumbers();
    lottos.forEach((lotto) => {
      const res = lotto.filter((val) => winningNumbers.includes(val));
      const hasBonus = lotto.includes(bonusNum);
      if (lotto.join('') === winningNumbers.join('')) {
        this.places['place1'] += 1;
      } else if (res.length === 5 && hasBonus) {
        this.places['place2'] += 1;
      } else if (res.length === 5) {
        this.places['place3'] += 1;
      } else if (res.length === 4) {
        this.places['place4'] += 1;
      } else if (res.length === 3) {
        this.places['place5'] += 1;
      }
    });

    return this.places;
  }

  calculateProfitRatio() {
    // 리뷰 전 코드
    // Object.keys(this.places).forEach((key) => {
    //   this.totalProfit += PRIZE_FOR_PLACE[key] * this.places[key];
    // });

    // if (!this.totalProfit) return 0;
    // return (this.purchasedAmount / this.totalProfit) * 100;
    const totalProfit = Object.entries(this.places).reduce(
      (total, [key, value]) => total + PRIZE_FOR_PLACE[key] * value,
      0
    );
    return totalProfit >= 0 ? (this.purchasedAmount / totalProfit) * 100 : 0;
  }

  initLottoState() {
    this.purchasedAmount = 0;
    this.quantity = 0;
    this.lottos = [];
    this.#resetPlaces();
  }

  #resetPlaces() {
    this.places = {
      place1: 0,
      place2: 0,
      place3: 0,
      place4: 0,
      place5: 0,
    };
  }
}
