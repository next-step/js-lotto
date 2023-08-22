import { SYMBOLS } from '@step1/constants/commons';
import { CUSTOM_EVENT, EVENT } from '@step3/constants/event';
import { SELECTOR_NAME } from '@step3/constants/selector';
import { View } from '@step3/view';

export default class WinningLottoInfoFormView extends View<HTMLFormElement> {
  constructor($element: HTMLFormElement) {
    super($element);
    this.setEvent();
  }

  protected setEvent() {
    this.$element.addEventListener(EVENT.SUBMIT, (event) => this.handleOnSubmit(event));
    this.$element.addEventListener('input', () => this.handleWinningInputsFocus());
  }

  private handleWinningInputsFocus() {
    const winningNumberInputNodes = this.createWinningNumberInputNode();
    winningNumberInputNodes.forEach((winningNumberInputNode, index) =>
      this.focusNextWinningNumberInputAfterMove({ winningNumberInputNode, index, winningNumberInputNodes }),
    );
  }

  private focusNextWinningNumberInputAfterMove({ winningNumberInputNode, index, winningNumberInputNodes }) {
    const isLastInputNode = index === winningNumberInputNodes.length - 1;
    const isLastInputValue = winningNumberInputNode.value.length > 1;
    if (isLastInputNode) return;
    if (isLastInputValue) winningNumberInputNodes[index + 1].focus();
  }

  private createWinningNumberInputNode() {
    return this.$element.querySelectorAll<HTMLInputElement>(SELECTOR_NAME.WINNING_NUMBER);
  }

  private createBonusNumberInputNode() {
    return this.$element.querySelector<HTMLInputElement>(SELECTOR_NAME.BONUS_NUMBER_INPUT);
  }

  private createWinningLottoInfo() {
    return {
      winningLottoNumbers: [...this.$element.querySelectorAll<HTMLInputElement>(SELECTOR_NAME.WINNING_NUMBER_INPUT)]
        .map((inputNode) => inputNode.value)
        .join(SYMBOLS.COMMA),
      bonusNumber: this.createBonusNumberInputNode().value,
    };
  }

  private handleOnSubmit = (event: Event) => {
    event.preventDefault();
    const { winningLottoNumbers, bonusNumber } = this.createWinningLottoInfo();
    this.emit(CUSTOM_EVENT.SUBMIT_WINNING_LOTTO_INFO, { winningLottoNumbers, bonusNumber });
  };

  public resetWinningLottoInfoForm() {
    this.$element
      .querySelectorAll<HTMLInputElement>(SELECTOR_NAME.WINNING_NUMBER_INPUT)
      .forEach((winningNumberInputNode) => {
        winningNumberInputNode.value = null;
      });
    this.createBonusNumberInputNode().value = null;
  }
}
