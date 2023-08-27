import { LottoBuyer, LottoResult } from '@step1/model';
import { CUSTOM_EVENT, EVENT } from '@step3/constants/event';
import { CLASS_NAME, SELECTOR_NAME } from '@step3/constants/selector';

import { $ } from '@step3/utils/dom';

import { LottoPurchaseFormView, PurchasedLottoView, WinningInfoModalView, WinningLottoInfoFormView } from '@step3/view';

export default class LottoApplicationController {
  private lottoPurchaseFormView: LottoPurchaseFormView;

  private purchasedLottoView: PurchasedLottoView;

  private winningLottoInfoFormView: WinningLottoInfoFormView;

  private winningInfoModalView: WinningInfoModalView;

  private lottoBuyer: LottoBuyer;

  private lottoResult: LottoResult;

  constructor() {
    this.initElements();
    this.reset();
    this.initEvent();
  }

  protected initEvent() {
    this.initLottoPurchaseFormSubmitEvent();
    this.initPurchasedLottosToggleButtonClickEvent();
    this.initWinningLottoInfoFormSubmitEvent();
    this.initWinningInfoModalResetEvent();
  }

  private initElements() {
    this.lottoPurchaseFormView = new LottoPurchaseFormView($<HTMLFormElement>(SELECTOR_NAME.INPUT_PRICE.FORM));
    this.purchasedLottoView = new PurchasedLottoView(
      $<HTMLTableSectionElement>(SELECTOR_NAME.PURCHASED.LOTTOS_SECTION),
    );
    this.winningLottoInfoFormView = new WinningLottoInfoFormView(
      $<HTMLFormElement>(SELECTOR_NAME.WINNING_LOTTO_INFO.FORM),
    );
    this.winningInfoModalView = new WinningInfoModalView($<HTMLDivElement>(SELECTOR_NAME.WINNING_INFO.MODAL));
    this.lottoBuyer = new LottoBuyer();
    this.lottoResult = new LottoResult(this.lottoBuyer);
  }

  private initLottoPurchaseFormSubmitEvent() {
    this.lottoPurchaseFormView.on(CUSTOM_EVENT.SUBMIT_PURCHASE_AMOUNT, (event: CustomEvent<number>) =>
      this.handlePurchaseLotto(event?.detail),
    );
  }

  private initPurchasedLottosToggleButtonClickEvent() {
    this.purchasedLottoView.on(EVENT.CLICK, ({ target }) => {
      if (target && target === $(SELECTOR_NAME.PURCHASED.LOTTOS_TOGGLE_BUTTON)) {
        this.handleToggleButton();
      }
    });
  }

  private initWinningLottoInfoFormSubmitEvent() {
    this.winningLottoInfoFormView.on(CUSTOM_EVENT.SUBMIT_WINNING_LOTTO_INFO, (event: CustomEvent) =>
      this.handleSubmitWinningLottoInfo(event),
    );
  }

  private initWinningInfoModalResetEvent() {
    this.winningInfoModalView.on(CUSTOM_EVENT.RESET, this.reset.bind(this));
  }

  protected reset() {
    this.resetLottoGame();
    this.resetViews();
    this.resetWinningLottoForm();
    this.resetPurchasedCheckboxStatus();
  }

  private resetLottoGame() {
    this.lottoBuyer.init();
  }

  private resetViews() {
    this.lottoPurchaseFormView.show();
    this.purchasedLottoView.hide();
    this.winningLottoInfoFormView.hide();
    $(SELECTOR_NAME.WINNING_INFO.MODAL).classList.remove(CLASS_NAME.OPEN);
  }

  private resetWinningLottoForm() {
    this.winningLottoInfoFormView.resetWinningLottoInfoForm();
  }

  private resetPurchasedCheckboxStatus() {
    this.purchasedLottoView.resetCheckboxStatus();
  }

  private handleToggleButton() {
    this.purchasedLottoView.renderLottoNumbersInToggleCondition();
  }

  private handlePurchaseLotto(purchaseAmount: number) {
    this.processWithAlertIfThrowError(() => {
      const lottoNumbers = this.lottoBuyer.buyLottos(purchaseAmount);
      this.purchasedLottoView.renderPurchasedLottoView(lottoNumbers);
      this.purchasedLottoView.show();
      this.winningLottoInfoFormView.show();
    });
  }

  private handleSubmitWinningLottoInfo(event: CustomEvent) {
    this.processWithAlertIfThrowError(() => {
      const { rateOfReturn, lottoResult } = this.createWinningInfo(event);
      this.winningInfoModalView.renderWinningInfoModal({ rateOfReturn, lottoResult });
      $(SELECTOR_NAME.WINNING_INFO.MODAL).classList.add(CLASS_NAME.OPEN);
    });
  }

  private createWinningInfo(event: CustomEvent) {
    const { winningLottoNumbers, bonusNumber } = event.detail;
    return this.lottoResult.createResults({ winningLottoNumbers, bonusNumber });
  }

  private processWithAlertIfThrowError<T, U>(executeFunction: (arg?: U) => T, arg?: U): void {
    try {
      executeFunction(arg);
    } catch (error) {
      alert(error.message);
    }
  }
}
