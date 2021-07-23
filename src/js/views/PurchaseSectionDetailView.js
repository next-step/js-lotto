import { qs } from '../util/helper.js';
import View from './View.js';

export default class PurchaseSectionDetailView extends View {
  constructor() {
    super(qs('#purchase-section-detail'));
    this.template = new Template();
  }

  show(lottos = [], isDetail = false) {
    this.element.innerHTML = this.template.getList(lottos, isDetail);
    super.show();
  }
}

class Template {
  getList(lottos = [], isDetail = false) {
    return isDetail
      ? `
      <div class="d-flex flex-wrap flex-col">
        ${lottos.map(this._getDetailItem).join('')}
      </div>
    `
      : `
      <div class="d-flex flex-wrap">
        ${lottos.map(this._getItem).join('')}
      </div>
    `;
  }

  _getItem() {
    return `
      <span class="mx-1 text-4xl">🎟️ </span>
    `;
  }
  _getDetailItem(lotto) {
    return `
      <div>
        <span class="mx-1 text-4xl">🎟️ </span>
        <span class="mx-1 text-xl">${lotto.getNumbers().join(', ')}</span>
      </div>
    `;
  }
}
