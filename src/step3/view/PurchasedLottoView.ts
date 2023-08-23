import { SELECTOR_NAME } from '@step3/constants/selector';
import { NODE_TEMPLATE } from '@step3/constants/template';
import { VIEW_MESSAGE_METHOD } from '@step3/constants/message';
import { SYMBOLS } from '@step1/constants/commons';

import { View } from '@step3/view';

export default class PurchasedLottoView extends View<HTMLTableSectionElement> {
  private $purchasedLottoLabel = this.$element.querySelector<HTMLLabelElement>(SELECTOR_NAME.PURCHASED.LOTTOS_LABEL);

  private $purchasedLottoContainer = this.$element.querySelector<HTMLUListElement>(SELECTOR_NAME.PURCHASED.LOTTOS);

  private $purchasedLottos: NodeListOf<HTMLLIElement> | null;

  private $lottoNumbersToggleButton = this.$element.querySelector<HTMLInputElement>(
    SELECTOR_NAME.PURCHASED.LOTTOS_TOGGLE_BUTTON,
  );

  private renderPurchasedLottoLabel(lottoNumberLength: number) {
    this.$purchasedLottoLabel.innerHTML = VIEW_MESSAGE_METHOD.PURCHASED_LOTTO(lottoNumberLength);
  }

  private renderPurchasedLotto(lottoNumbers: number[][]) {
    this.$purchasedLottoContainer.innerHTML = lottoNumbers.reduce((purchasedLottoNode) => {
      purchasedLottoNode += NODE_TEMPLATE.LOTTO;
      return purchasedLottoNode;
    }, '');
    this.$purchasedLottos = this.$purchasedLottoContainer.querySelectorAll<HTMLLIElement>(
      SELECTOR_NAME.PURCHASED.LOTTO,
    );
  }

  private renderLottoNumber(lottoNumberNode: Element, lottoNumbers?: number[]) {
    lottoNumberNode.textContent = lottoNumbers ? lottoNumbers.join(`${SYMBOLS.COMMA} `) : null;
    lottoNumberNode.className = lottoNumbers ? 'text-xl ml-2' : null;
  }

  public renderLottoNumberInPurchasedLotto(lottoNumbers?: number[][]) {
    this.$purchasedLottos.forEach((lottoNode, index) => {
      const lottoNumberNode = lottoNode.querySelector(SELECTOR_NAME.PURCHASED.LOTTO_NUMBERS);
      this.renderLottoNumber(lottoNumberNode, lottoNumbers ? lottoNumbers[index] : null);
    });
  }

  public renderPurchasedLottoView(lottoNumbers: number[][]) {
    this.resetCheckboxStatus();
    this.renderPurchasedLottoLabel(lottoNumbers.length);
    this.renderPurchasedLotto(lottoNumbers);
  }

  public resetCheckboxStatus() {
    this.$lottoNumbersToggleButton.checked = false;
  }
}
