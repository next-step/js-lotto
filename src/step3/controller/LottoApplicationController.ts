import { LottoGame } from '@step1/model';
import { CUSTOM_EVENT } from '@step3/constants/event';
import { SELECTOR_NAME } from '@step3/constants/selector';
import { $ } from '@step3/utils/dom';
import { LottoPurchaseFormView } from '@step3/view';

export default class LottoApplicationController {
  private lottoPurchaseFormView: LottoPurchaseFormView;

  private lottoGame: LottoGame;

  constructor() {
    this.lottoPurchaseFormView = new LottoPurchaseFormView($<HTMLFormElement>(SELECTOR_NAME.LOTTO_PURCHASE_FORM));
    this.lottoGame = new LottoGame();
    this.initEvent();
  }

  private initEvent() {
    this.lottoPurchaseFormView.on(CUSTOM_EVENT.SUBMIT_PURCHASE_AMOUNT, (event: CustomEvent<number>) =>
      this.handlePurchaseLotto(event.detail),
    );
  }

  private handlePurchaseLotto(purchaseAmount: number) {
    const lottoNumbers = this.lottoGame.createLottoNumbers(purchaseAmount);
    console.log(lottoNumbers);
  }

  public run() {}
}
