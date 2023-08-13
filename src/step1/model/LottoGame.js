import { Bank, Lotto, LottoMerchant } from './index.js';

export default class LottoGame {
  createWinningLottoNumbers(winningNumbers) {
    return Lotto.fromByString(winningNumbers, ',').getLottoNumbers();
  }

  createLottoNumbers(amount) {
    return LottoMerchant.from(amount)
      .sellLotto()
      .map((lotto) => lotto.getLottoNumbers());
  }

  createResults({ winningLottoNumber, bonusNumber, lottoNumbers, investmentAmount }) {
    return Bank.from(winningLottoNumber, bonusNumber).calculateResults(lottoNumbers, investmentAmount);
  }
}
