import { delegate, qs } from '../util/helper.js';
import View from './View.js';

export default class PurchaseSectionInfoView extends View {
  constructor() {
    super(qs('#purchase-section-info'));
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

  show(lottos = []) {
    this.element.innerHTML = lottos.length > 0 && this.template.getInfo(lottos);
    super.show();
  }
}

class Template {
  getInfo(lottos) {
    return `
    <label class="flex-auto my-0">총 ${lottos.length}개를 구매하였습니다.</label>
    <div class="flex-auto d-flex justify-end pr-1">
      <label class="switch">
        <input type="checkbox" class="lotto-numbers-toggle-button" id="lotto-switch"/>
        <span class="text-base font-normal">번호보기</span>
      </label>
    </div>
    `;
  }
}
