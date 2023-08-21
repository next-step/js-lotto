import { CLASS_NAME, SELECTOR_NAME } from '@step3/constants/selector';
import { $ } from '@step3/utils/dom';
import { WinningLottoInfoFormView, WinningInfoModalView } from '@step3/view';
import { CUSTOM_EVENT } from '@step3/constants/event';
import { LottoGame } from '@step1/model';
import LottoApplicationController from './LottoApplicationController';

export default class ConfirmLottoController extends LottoApplicationController {
  private winningLottoInfoFormView: WinningLottoInfoFormView;

  private winningInfoModalView: WinningInfoModalView;

  constructor(lottoGame?: LottoGame) {
    super(lottoGame);
    this.winningLottoInfoFormView = new WinningLottoInfoFormView(
      $<HTMLFormElement>(SELECTOR_NAME.WINNING_LOTTO_INFO_FORM),
    );
    this.winningInfoModalView = new WinningInfoModalView($<HTMLDivElement>(SELECTOR_NAME.MODAL));
    this.initEvent();
  }

  protected initEvent() {
    this.winningLottoInfoFormView.on(CUSTOM_EVENT.SUBMIT_WINNING_LOTTO_INFO, (event: CustomEvent) =>
      this.handleSubmitWinningLottoInfo(event),
    );
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
