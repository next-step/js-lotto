import { SYMBOLS } from '@step1/constants/commons';
import { CreateResultsParams } from '@step1/controller/LottoGameController.type';
import { BuyerInfo } from '@step1/model/LottoGame/LottoGame.type';
import { Bank, Lotto, LottoMerchant } from '@step1/model';
import { WinningLottoInfo } from '@step1/utils/jsDoc';

export default class LottoGame {
  buyerInfo: BuyerInfo = {
    lottos: [],
    investmentAmount: 0,
  };

  winningLottoInfo: WinningLottoInfo = {
    winningLottoNumbers: [],
    bonusNumber: 0,
  };

  #setWinningLottoInfo({ winningLottoNumbers, bonusNumber }: WinningLottoInfo) {
    this.winningLottoInfo = { winningLottoNumbers, bonusNumber };
  }

  #setBuyerInfo({ lottos, investmentAmount }: BuyerInfo) {
    this.buyerInfo = { lottos, investmentAmount };
  }

  createWinningLottoNumbers(winningNumbers: string) {
    return Lotto.fromByString(winningNumbers, SYMBOLS.COMMA).getLottoNumbers();
  }

  createLottoNumbers(amount: number) {
    const lottos = LottoMerchant.from(amount).sellLotto();
    this.#setBuyerInfo({ lottos, investmentAmount: amount });
    return lottos.map((lotto) => lotto.getLottoNumbers());
  }

  createResults({ winningLottoNumber, bonusNumber, lottoNumbers, investmentAmount }: CreateResultsParams) {
    this.#setWinningLottoInfo({ winningLottoNumbers: winningLottoNumber, bonusNumber });
    return Bank.from(winningLottoNumber, bonusNumber).calculateResults(lottoNumbers, investmentAmount);
  }
}
