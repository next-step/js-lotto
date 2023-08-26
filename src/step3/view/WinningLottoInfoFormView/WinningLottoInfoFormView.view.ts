import { SYMBOLS } from '@step1/constants/commons';
import { CUSTOM_EVENT, EVENT } from '@step3/constants/event';
import { SELECTOR_NAME } from '@step3/constants/selector';
import { View } from '@step3/view';
import { FocusNextWinningNumberInputAfterMoveParams } from '@step3/view/WinningLottoInfoFormView';

export default class WinningLottoInfoFormView extends View<HTMLFormElement> {
  private $bonusNumberInput: HTMLInputElement;

  private $winningLottoNumberInputs: NodeListOf<HTMLInputElement>;

  private $winningLottoInfoInputs: NodeListOf<HTMLInputElement>;

  constructor($element: HTMLFormElement) {
    super($element);
    this.initElement();
    this.setEvent();
  }

  protected initElement() {
    this.$bonusNumberInput = this.$element.querySelector<HTMLInputElement>(
      SELECTOR_NAME.WINNING_LOTTO_INFO.BONUS_NUMBER_INPUT,
    );
    this.$winningLottoNumberInputs = this.$element.querySelectorAll<HTMLInputElement>(
      SELECTOR_NAME.WINNING_LOTTO_INFO.WINNING_NUMBER_INPUT,
    );
    this.$winningLottoInfoInputs = this.$element.querySelectorAll<HTMLInputElement>(
      SELECTOR_NAME.WINNING_LOTTO_INFO.INPUTS,
    );
  }

  protected setEvent() {
    this.$element.addEventListener(EVENT.SUBMIT, (event) => this.handleActionWinningLottoInfo(event));
    this.$element.addEventListener(EVENT.INPUT, () => this.handleActionFocusWinningLottoInfoInputs());
  }

  private handleActionWinningLottoInfo = (event: Event) => {
    event.preventDefault();
    const { winningLottoNumbers, bonusNumber } = this.createWinningLottoInfo();
    this.emit(CUSTOM_EVENT.SUBMIT_WINNING_LOTTO_INFO, { winningLottoNumbers, bonusNumber });
  };

  private handleActionFocusWinningLottoInfoInputs() {
    const winningLottoInfoInputs = this.$winningLottoInfoInputs;
    winningLottoInfoInputs.forEach((winningLottoInfoInput, index) =>
      this.focusNextWinningNumberInputAfterMove({ winningLottoInfoInput, index, winningLottoInfoInputs }),
    );
  }

  private focusNextWinningNumberInputAfterMove({
    winningLottoInfoInput,
    index,
    winningLottoInfoInputs,
  }: FocusNextWinningNumberInputAfterMoveParams) {
    const isLastInputNode = index === winningLottoInfoInputs.length - 1;
    const isLastInputValue = winningLottoInfoInput.value.length > 1;
    if (isLastInputNode) return;
    if (winningLottoInfoInputs[index + 1] && isLastInputValue) winningLottoInfoInputs[index + 1].focus();
  }

  private createWinningLottoInfo() {
    return {
      winningLottoNumbers: [...this.$winningLottoNumberInputs]
        .map((winningLottoNumberInput) => winningLottoNumberInput?.value)
        .join(SYMBOLS.COMMA),
      bonusNumber: this.$bonusNumberInput.value,
    };
  }

  public resetWinningLottoInfoForm() {
    this.$element.reset();
  }
}
