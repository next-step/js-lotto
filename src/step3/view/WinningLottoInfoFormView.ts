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
  }

  private createWinningNumberInputNode() {
    return this.$element.querySelectorAll<HTMLInputElement>(SELECTOR_NAME.WINNING_NUMBER_INPUT);
  }

  private createBonusNumberInputNode() {
    return this.$element.querySelector<HTMLInputElement>(SELECTOR_NAME.BONUS_NUMBER_INPUT);
  }

  private createWinningLottoInfo() {
    return {
      winningLottoNumbers: [...this.createWinningNumberInputNode()]
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
    this.createWinningNumberInputNode().forEach((winningNumberInputNode) => {
      winningNumberInputNode.value = null;
    });
    this.createBonusNumberInputNode().value = null;
  }
}
