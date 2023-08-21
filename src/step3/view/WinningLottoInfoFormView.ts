import { SYMBOLS } from '@step1/constants/commons';
import { CUSTOM_EVENT, EVENT } from '@step3/constants/event';
import { View } from '@step3/view';

export default class WinningLottoInfoFormView extends View<HTMLFormElement> {
  constructor($element: HTMLFormElement) {
    super($element);
    this.setEvent();
  }

  protected setEvent() {
    this.$element.addEventListener(EVENT.SUBMIT, (event) => this.handleOnSubmit(event));
  }

  private createWinningLottoInfo() {
    return {
      winningLottoNumbers: [...this.$element.querySelectorAll<HTMLInputElement>('.winning-number')]
        .map((inputNode) => inputNode.value)
        .join(SYMBOLS.COMMA),
      bonusNumber: this.$element.querySelector<HTMLInputElement>('.bonus-number').value,
    };
  }

  private handleOnSubmit = (event: Event) => {
    event.preventDefault();
    const { winningLottoNumbers, bonusNumber } = this.createWinningLottoInfo();
    this.emit(CUSTOM_EVENT.SUBMIT_WINNING_LOTTO_INFO, { winningLottoNumbers, bonusNumber });
  };
}
