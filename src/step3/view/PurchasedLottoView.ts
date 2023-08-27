import { SELECTOR_NAME } from '@step3/constants/selector';
import { NODE_TEMPLATE } from '@step3/constants/template';
import { VIEW_MESSAGE_METHOD } from '@step3/constants/message';
import { SYMBOLS } from '@step1/constants/commons';

import { View } from '@step3/view';

export default class PurchasedLottoView extends View<HTMLTableSectionElement> {
  private $purchasedLottoLabel: HTMLLabelElement;

  private $purchasedLottoContainer: HTMLUListElement;

  private $purchasedLottos: NodeListOf<HTMLLIElement> | null;

  private $lottoNumbersToggleButton: HTMLInputElement;

  constructor($element: HTMLTableSectionElement) {
    super($element);
    this.initElement();
  }

  protected initElement() {
    this.$purchasedLottoLabel = this.$element.querySelector<HTMLLabelElement>(SELECTOR_NAME.PURCHASED.LOTTOS_LABEL);
    this.$purchasedLottoContainer = this.$element.querySelector<HTMLUListElement>(SELECTOR_NAME.PURCHASED.LOTTOS);
    this.$lottoNumbersToggleButton = this.$element.querySelector<HTMLInputElement>(
      SELECTOR_NAME.PURCHASED.LOTTOS_TOGGLE_BUTTON,
    );
  }

  private renderPurchasedLottoLabel(lottoNumberLength: number) {
    this.$purchasedLottoLabel.innerHTML = VIEW_MESSAGE_METHOD.PURCHASED_LOTTO(lottoNumberLength);
  }

  private renderPurchasedLotto(lottoNumbers: number[][]) {
    this.$purchasedLottoContainer.innerHTML = lottoNumbers.reduce((purchasedLottoNode, lottoNumber) => {
      purchasedLottoNode += NODE_TEMPLATE.LOTTO(lottoNumber.join(`${SYMBOLS.COMMA} `));
      return purchasedLottoNode;
    }, '');
    this.$purchasedLottos = this.$purchasedLottoContainer.querySelectorAll<HTMLLIElement>(
      SELECTOR_NAME.PURCHASED.LOTTO,
    );
  }

  public renderLottoNumbersInToggleCondition() {
    if (this.$lottoNumbersToggleButton.checked) {
      this.$purchasedLottoContainer.classList.add('view-lotto-numbers');
      return;
    }
    this.$purchasedLottoContainer.classList.remove('view-lotto-numbers');
  }

  public renderPurchasedLottoView(lottoNumbers: number[][]) {
    this.resetCheckboxStatus();
    this.renderPurchasedLottoLabel(lottoNumbers.length);
    this.renderPurchasedLotto(lottoNumbers);
    this.renderLottoNumbersInToggleCondition();
  }

  public resetCheckboxStatus() {
    this.$lottoNumbersToggleButton.checked = false;
  }
}
