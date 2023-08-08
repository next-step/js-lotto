import { LottoCalculator, LottoMerchant } from './index.js';

export default class LottoBuyer {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  static fromGiveAmount(amount) {
    return new LottoBuyer(amount);
  }

  buyLotto() {
    const lottoMerchant = LottoMerchant.fromPay(this.#amount);
    return lottoMerchant.sellLotto();
  }

  confirmResult({ investmentAmount, winningNumbers, bonusNumber, lottos }) {
    const lottoCalculator = new LottoCalculator();
    return lottoCalculator.calculateResult({
      investmentAmount,
      winningNumbers,
      bonusNumber,
      lottos,
    });
  }
}
