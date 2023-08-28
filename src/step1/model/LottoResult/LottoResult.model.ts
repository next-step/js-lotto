import { SYMBOLS } from '@step1/constants/commons';
import { Bank, Lotto, LottoBuyer } from '@step1/model';

export default class LottoResult {
  private lottoBuyer: LottoBuyer;

  constructor(lottoBuyer: LottoBuyer) {
    this.lottoBuyer = lottoBuyer;
  }

  private createWinningLottoNumbers(winningNumbers: string) {
    return Lotto.fromByString(winningNumbers, SYMBOLS.COMMA).getLottoNumbers();
  }

  private calculateResults({ winningLottoNumber, bonusNumber, lottoNumbers, investmentAmount }) {
    return Bank.from(winningLottoNumber, bonusNumber).calculateResults(lottoNumbers, investmentAmount);
  }

  public createResults({ winningLottoNumbers, bonusNumber }) {
    const winningLottoNumber = this.createWinningLottoNumbers(winningLottoNumbers);
    const { lottos, investmentAmount } = this.lottoBuyer.getBuyerInfo();
    const lottoNumbers = lottos.map((lotto) => lotto.getLottoNumbers());
    return this.calculateResults({ winningLottoNumber, bonusNumber, lottoNumbers, investmentAmount });
  }
}
