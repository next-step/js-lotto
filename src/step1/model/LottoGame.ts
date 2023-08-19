import { SYMBOLS } from '@step1/constants/commons';
import { CreateResultsParams } from '@step1/controller/LottoGameController.type';
import { Bank, Lotto, LottoMerchant } from '@step1/model';

export default class LottoGame {
  createWinningLottoNumbers(winningNumbers: string) {
    return Lotto.fromByString(winningNumbers, SYMBOLS.COMMA).getLottoNumbers();
  }

  createLottoNumbers(amount: number) {
    return LottoMerchant.from(amount)
      .sellLotto()
      .map((lotto) => lotto.getLottoNumbers());
  }

  createResults({ winningLottoNumber, bonusNumber, lottoNumbers, investmentAmount }: CreateResultsParams) {
    return Bank.from(winningLottoNumber, bonusNumber).calculateResults(lottoNumbers, investmentAmount);
  }
}
