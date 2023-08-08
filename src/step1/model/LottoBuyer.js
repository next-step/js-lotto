import { LottoCalculator, LottoMerchant } from './index.js';

export default class LottoBuyer {
  #lottoMerchant;

  #lottoCalculator;

  constructor() {
    this.#lottoMerchant = new LottoMerchant();
    this.#lottoCalculator = new LottoCalculator();
  }

  buyLotto(amount) {
    return this.#lottoMerchant.sellLotto(amount);
  }

  confirmResult({ investmentAmount, winningNumbers, bonusNumber, lottos }) {
    return this.#lottoCalculator.calculateResult({
      investmentAmount,
      winningNumbers,
      bonusNumber,
      lottos,
    });
  }
}
