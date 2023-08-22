import { CUSTOM_EVENT, EVENT } from '@step3/constants/event';
import { CLASS_NAME, SELECTOR_NAME } from '@step3/constants/selector';
import { $ } from '@step3/utils/dom';
import { LottoPurchaseFormView, PurchasedLottoView, WinningInfoModalView, WinningLottoInfoFormView } from '@step3/view';
import { LottoGame } from '@step1/model';
import Controller from './Controller';

export default class LottoApplicationController extends Controller {
  private lottoPurchaseFormView = new LottoPurchaseFormView($<HTMLFormElement>(SELECTOR_NAME.LOTTO_PURCHASE_FORM));

  private purchasedLottoView = new PurchasedLottoView(
    $<HTMLTableSectionElement>(SELECTOR_NAME.PURCHASED_LOTTOS_SECTION),
  );

  private winningLottoInfoFormView = new WinningLottoInfoFormView(
    $<HTMLFormElement>(SELECTOR_NAME.WINNING_LOTTO_INFO_FORM),
  );

  private winningInfoModalView = new WinningInfoModalView($<HTMLDivElement>(SELECTOR_NAME.MODAL));

  constructor(lottoGame?: LottoGame) {
    super(lottoGame);
    this.reset();
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
    this.winningLottoInfoFormView.on(CUSTOM_EVENT.SUBMIT_WINNING_LOTTO_INFO, (event: CustomEvent) =>
      this.handleSubmitWinningLottoInfo(event),
    );
    this.winningInfoModalView.on(CUSTOM_EVENT.RESET, () => this.reset());
  }

  protected reset() {
    this.resetLottoGame();
    this.resetViews();
    this.resetWinningLottoForm();
    this.resetPurchasedCheckbox();
  }

  private resetLottoGame() {
    this.lottoGame.setBuyerInfo({ lottos: [], investmentAmount: 0 });
    this.lottoGame.setWinningLottoInfo({ winningLottoNumbers: [], bonusNumber: 0 });
  }

  private resetViews() {
    this.lottoPurchaseFormView.show();
    this.purchasedLottoView.hide();
    this.winningLottoInfoFormView.hide();
    $(SELECTOR_NAME.MODAL).classList.remove(CLASS_NAME.OPEN);
  }

  private resetWinningLottoForm() {
    this.winningLottoInfoFormView.resetWinningLottoInfoForm();
  }

  private resetPurchasedCheckbox() {
    this.purchasedLottoView.resetCheckboxStatus();
  }

  private handleToggleButton() {
    const isChecked = $<HTMLInputElement>(SELECTOR_NAME.LOTTO_NUMBERS_TOGGLE_BUTTON).checked;
    const lottoNumbers = isChecked ? this.lottoGame.buyerInfo.lottos.map((lotto) => lotto.getLottoNumbers()) : null;
    this.purchasedLottoView.renderLottoNumberInPurchasedLotto(lottoNumbers);
  }

  private handlePurchaseLotto(purchaseAmount: number) {
    this.purchasedLottoView.show();
    this.winningLottoInfoFormView.show();
    const lottoNumbers = this.lottoGame.createLottoNumbers(purchaseAmount);
    this.purchasedLottoView.renderPurchasedLottoView(lottoNumbers);
  }

  private handleSubmitWinningLottoInfo(event: CustomEvent) {
    $(SELECTOR_NAME.MODAL).classList.add(CLASS_NAME.OPEN);
    const { rateOfReturn, lottoResult } = this.createWinningInfo(event);
    this.winningInfoModalView.renderWinningInfoModal({ rateOfReturn, lottoResult });
  }

  private createWinningInfo(event: CustomEvent) {
    const { winningLottoNumber, bonusNumber, lottoNumbers, investmentAmount } = this.createResultParams(event);
    return this.lottoGame.createResults({
      winningLottoNumber,
      bonusNumber,
      lottoNumbers,
      investmentAmount,
    });
  }

  private createResultParams(event: CustomEvent) {
    const { winningLottoNumber, bonusNumber } = this.createWinningLottoInfo(event.detail);
    const { lottos, investmentAmount } = this.lottoGame.buyerInfo;
    const lottoNumbers = lottos.map((lotto) => lotto.getLottoNumbers());
    return { winningLottoNumber, bonusNumber, lottoNumbers, investmentAmount };
  }

  private createWinningLottoInfo(winningLottoInfo: { winningLottoNumbers: string; bonusNumber: string }) {
    const { winningLottoNumbers, bonusNumber } = winningLottoInfo;
    return {
      winningLottoNumber: this.lottoGame.createWinningLottoNumbers(winningLottoNumbers),
      bonusNumber: Number(bonusNumber),
    };
  }
}
