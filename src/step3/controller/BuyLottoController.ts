import { CUSTOM_EVENT, EVENT } from '@step3/constants/event';
import { SELECTOR_NAME } from '@step3/constants/selector';
import { $ } from '@step3/utils/dom';
import { LottoPurchaseFormView, PurchasedLottoView } from '@step3/view';
import { LottoGame } from '@step1/model';
import LottoApplicationController from './LottoApplicationController';

export default class BuyLottoController extends LottoApplicationController {
  private lottoPurchaseFormView: LottoPurchaseFormView;

  private purchasedLottoView: PurchasedLottoView;

  constructor(lottoGame?: LottoGame) {
    super(lottoGame);
    this.lottoPurchaseFormView = new LottoPurchaseFormView($<HTMLFormElement>(SELECTOR_NAME.LOTTO_PURCHASE_FORM));
    this.purchasedLottoView = new PurchasedLottoView(
      $<HTMLTableSectionElement>(SELECTOR_NAME.PURCHASED_LOTTOS_SECTION),
    );
    this.initEvent();
  }

  protected initEvent() {
    this.lottoPurchaseFormView.on(CUSTOM_EVENT.SUBMIT_PURCHASE_AMOUNT, (event: CustomEvent<number>) =>
      this.handlePurchaseLotto(event.detail),
    );
    this.purchasedLottoView.on(EVENT.CLICK, (event) => {
      if (event.target === $(SELECTOR_NAME.LOTTO_NUMBERS_TOGGLE_BUTTON)) {
        this.handleToggleButton();
      }
    });
  }

  private handleToggleButton() {
    const isChecked = $<HTMLInputElement>(SELECTOR_NAME.LOTTO_NUMBERS_TOGGLE_BUTTON).checked;
    const lottoNumbers = isChecked ? this.lottoGame.buyerInfo.lottos.map((lotto) => lotto.getLottoNumbers()) : null;
    this.purchasedLottoView.renderLottoNumberInPurchasedLotto(lottoNumbers);
  }

  private handlePurchaseLotto(purchaseAmount: number) {
    const lottoNumbers = this.lottoGame.createLottoNumbers(purchaseAmount);
    this.purchasedLottoView.renderPurchasedLottoView(lottoNumbers);
  }
}
