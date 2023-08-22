import { LottoResult, WinningInfo } from '@step1/utils/jsDoc';
import { CUSTOM_EVENT, EVENT } from '@step3/constants/event';
import { VIEW_MESSAGE_METHOD } from '@step3/constants/message';
import { CLASS_NAME, SELECTOR_NAME } from '@step3/constants/selector';
import { SEMANTIC_TAG } from '@step3/constants/semanticTag';
import { View } from '@step3/view';

export default class WinningInfoModalView extends View<HTMLDivElement> {
  private $closeModalButton = this.$element.querySelector<HTMLButtonElement>(SELECTOR_NAME.CLOSE_MODAL);

  private $resetButton = this.$element.querySelector<HTMLButtonElement>(SELECTOR_NAME.RESET_BUTTON);

  private $rateOfReturnText = this.$element.querySelector(SELECTOR_NAME.RATE_OF_RETURN_TEXT);

  private $winningInfoTable = this.$element.querySelectorAll(`${SEMANTIC_TAG.TBODY} ${SEMANTIC_TAG.TR}`);

  constructor($element: HTMLDivElement) {
    super($element);
    this.setEvent();
  }

  protected setEvent() {
    this.$closeModalButton.addEventListener(EVENT.CLICK, (event) => this.handleOnClose(event));
    this.$resetButton.addEventListener(EVENT.CLICK, (event) => this.handleResetButton(event));
  }

  private handleResetButton = (event: Event) => {
    event.preventDefault();
    this.emit(CUSTOM_EVENT.RESET, {});
  };

  private handleOnClose = (event: Event) => {
    event.preventDefault();
    this.$element.classList.remove(CLASS_NAME.OPEN);
  };

  private renderRateOfReturn(rateOfReturn: string) {
    if (this.$rateOfReturnText) {
      this.$rateOfReturnText.textContent = VIEW_MESSAGE_METHOD.RATE_OF_RETURN(rateOfReturn);
    }
  }

  private renderWinningInfoTable(lottoResult: LottoResult) {
    this.$winningInfoTable.forEach((row) => {
      const [correctCountCell, winningAmountCell, winningCountCell] = row.querySelectorAll(SEMANTIC_TAG.TD);
      const winningInfoKey = this.createWinningInfoKey(correctCountCell.textContent, winningAmountCell.textContent);
      winningCountCell.textContent = VIEW_MESSAGE_METHOD.CORRECT_COUNT(lottoResult, winningInfoKey);
    });
  }

  private createWinningInfoKey(correctCount: string, winningAmount: string) {
    if (correctCount === '5개 + 보너스볼') {
      return `5개 일치, 보너스 볼 일치 (${winningAmount}원)`;
    }
    return `${correctCount} 일치 (${winningAmount}원)`;
  }

  public renderWinningInfoModal({ rateOfReturn, lottoResult }: WinningInfo) {
    this.renderRateOfReturn(rateOfReturn);
    this.renderWinningInfoTable(lottoResult);
  }
}
