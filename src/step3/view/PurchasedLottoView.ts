import { SELECTOR_NAME } from '@step3/constants/selector';
import { NODE_TEMPLATE } from '@step3/constants/template';
import { VIEW_MESSAGE_METHOD } from '@step3/constants/message';

import { View } from '@step3/view';
import { SYMBOLS } from '@step1/constants/commons';

export default class PurchasedLottoView extends View<HTMLTableSectionElement> {
  private renderPurchasedLottoLabel(lottoNumberLength: number) {
    this.$element.querySelector(SELECTOR_NAME.PURCHASED_LOTTOS_LABEL).innerHTML =
      VIEW_MESSAGE_METHOD.PURCHASED_LOTTO(lottoNumberLength);
  }

  private renderPurchasedLotto(lottoNumbers: number[][]) {
    this.$element.querySelector(SELECTOR_NAME.PURCHASED_LOTTOS).innerHTML = lottoNumbers.reduce(
      (purchasedLottoNode) => {
        purchasedLottoNode += NODE_TEMPLATE.LOTTO;
        return purchasedLottoNode;
      },
      '',
    );
  }

  private renderLottoNumber(lottoNumberNode: Element, lottoNumbers?: number[]) {
    lottoNumberNode.textContent = lottoNumbers ? lottoNumbers.join(`${SYMBOLS.COMMA} `) : null;
    lottoNumberNode.className = lottoNumbers ? 'text-xl ml-2' : null;
  }

  public renderLottoNumberInPurchasedLotto(lottoNumbers?: number[][]) {
    const purchaseLottoNode = this.$element.querySelectorAll(SELECTOR_NAME.PURCHASED_LOTTO);
    purchaseLottoNode.forEach((childNode, index) => {
      const lottoNumberNode = childNode.querySelector(SELECTOR_NAME.PURCHASED_LOTTO_NUMBERS);
      this.renderLottoNumber(lottoNumberNode, lottoNumbers ? lottoNumbers[index] : null);
    });
  }

  public renderPurchasedLottoView(lottoNumbers: number[][]) {
    this.renderPurchasedLottoLabel(lottoNumbers.length);
    this.renderPurchasedLotto(lottoNumbers);
  }

  public resetCheckboxStatus() {
    this.$element.querySelector<HTMLInputElement>(SELECTOR_NAME.LOTTO_NUMBERS_TOGGLE_BUTTON).checked = false;
  }
}
