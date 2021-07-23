import { delegate, qs } from '../util/helper.js';
import View from './View.js';

export default class PurchaseSection extends View {
  constructor() {
    super(qs('#purchase-section'));
    this.template = new Template();

    this.bindEvent();
  }

  bindEvent() {
    delegate(this.element, 'change', '#lotto-switch', () =>
      this.handleChange()
    );
  }

  handleChange() {
    this.emit('@change');
  }

  show(lottos = [], isDetail = false) {
    this.element.innerHTML =
      lottos.length > 0 && this.template.getList(lottos, isDetail);
    super.show();
  }
}

class Template {
  getList(lottos = [], isDetail) {
    return `
    <div class="d-flex">
      <label class="flex-auto my-0">
      총 ${lottos.length}개를 구매하였습니다.
      </label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" id="lotto-switch" class="lotto-numbers-toggle-button" ${
            isDetail && 'checked'
          }/>
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    ${
      isDetail
        ? `
      <div class="d-flex flex-wrap flex-col">
        ${lottos.map(this._getDetailItem).join('')}
      </div>
    `
        : `
      <div class="d-flex flex-wrap">
        ${lottos.map(this._getItem).join('')}
      </div>
    `
    }
    
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

{
  /* 
  <div class="d-flex">
    <label class="flex-auto my-0">총 5개를 구매하였습니다.</label>
    <div class="flex-auto d-flex justify-end pr-1">
      <label class="switch">
        <input type="checkbox" class="lotto-numbers-toggle-button" />
        <span class="text-base font-normal">번호보기</span>
      </label>
    </div>
  </div>
  <div class="d-flex flex-wrap">
    <span class="mx-1 text-4xl">🎟️ </span>
    <span class="mx-1 text-4xl">🎟️ </span>
    <span class="mx-1 text-4xl">🎟️ </span>
    <span class="mx-1 text-4xl">🎟️ </span>
    <span class="mx-1 text-4xl">🎟️ </span>
  </div> 
  */
}
