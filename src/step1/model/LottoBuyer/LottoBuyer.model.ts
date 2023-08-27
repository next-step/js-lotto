import { LottoMerchant } from '@step1/model';
import { BuyerInfo } from '@step1/model/LottoBuyer';

export default class LottoBuyer {
  private buyerInfo: BuyerInfo;

  constructor() {
    this.init();
  }

  private setBuyerInfo({ lottos, investmentAmount }: BuyerInfo) {
    this.buyerInfo = { lottos, investmentAmount };
  }

  public init() {
    this.buyerInfo = {
      lottos: [],
      investmentAmount: 0,
    };
  }

  public getBuyerInfo() {
    return this.buyerInfo;
  }

  public buyLottos(amount: number) {
    const lottos = LottoMerchant.from(amount).sellLotto();
    this.setBuyerInfo({ lottos, investmentAmount: amount });
    return this.buyerInfo.lottos.map((lotto) => lotto.getLottoNumbers());
  }
}
