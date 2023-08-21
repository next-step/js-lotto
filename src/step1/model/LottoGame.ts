import { SYMBOLS } from '@step1/constants/commons';
import { CreateResultsParams } from '@step1/controller/LottoGameController.type';
import { Bank, Lotto, LottoMerchant } from '@step1/model';

export default class LottoGame {
  lottos: Lotto[];

  #setLottos(lottos: Lotto[]) {
    this.lottos = lottos;
  }

  createWinningLottoNumbers(winningNumbers: string) {
    return Lotto.fromByString(winningNumbers, SYMBOLS.COMMA).getLottoNumbers();
  }

  createLottoNumbers(amount: number) {
    const lottos = LottoMerchant.from(amount).sellLotto();
    this.#setLottos(lottos);
    return lottos.map((lotto) => lotto.getLottoNumbers());
  }

  createResults({ winningLottoNumber, bonusNumber, lottoNumbers, investmentAmount }: CreateResultsParams) {
    return Bank.from(winningLottoNumber, bonusNumber).calculateResults(lottoNumbers, investmentAmount);
  }
}
