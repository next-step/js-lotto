import { Bank, Lotto, LottoMerchant } from './index.js';

export default class LottoGame {
  createWinningLottoNumbers(winningNumbers) {
    return Lotto.fromLottoByString(winningNumbers, ',').getLottoNumbers();
  }

  createLottoNumbers(amount) {
    return LottoMerchant.fromLottoMerchantForPay(amount)
      .sellLotto()
      .map((lotto) => lotto.getLottoNumbers());
  }

  createResults({ winningLottoNumber, bonusNumber, lottoNumbers, investmentAmount }) {
    return Bank.from(winningLottoNumber, bonusNumber).calculateResults(lottoNumbers, investmentAmount);
  }
}
