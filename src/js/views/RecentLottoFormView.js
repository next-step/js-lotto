import { VALUE } from '../util/Constans.js';
import { on, qs, qsAll } from '../util/helper.js';
import View from './View.js';

export default class RecentLottoFormView extends View {
  constructor() {
    super(qs('#input-lotto-nums'));
    this.template = new Template();
    this.inputElements = [];

    this.bindEvent();
  }

  show() {
    this.element.innerHTML = this.template.getList();
    if (!this.inputElements.length) {
      this.inputElements = qsAll('[type=number]', this.element);
    }
    super.show();
  }

  bindEvent() {
    on(this.element, 'submit', (event) => this.handleSubmit(event));
    on(this.element, 'input', (event) => this.handleInput(event));
  }

  handleSubmit(event) {
    event.preventDefault();

    const winnerNum = this.inputElements.map(({ value }) => +value);

    this.emit('@submit', { winnerNum });
  }

  changeFocus(target) {
    if (!target.nextElementSibling) return;
    target.nextElementSibling.focus();
  }

  handleInput(event) {
    const target = event.target;
    this.emit('@input', { target });
  }
}

class Template {
  getList() {
    return `
      <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 
      ${VALUE.LOTTO_COUNT}개와 보너스 넘버 
      ${VALUE.LOTTO_BONUS_COUNT}개를 입력해주세요.
      </label>
      <div id="winner-num-input-wrapper"class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          ${this._getInputbox().repeat(VALUE.LOTTO_COUNT)}
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            ${this._getBonusInputbox().repeat(VALUE.LOTTO_BONUS_COUNT)}
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="open-result-modal-button mt-5 btn btn-cyan w-100"
        id="winner-num-submitBtn"
      >
      결과 확인하기
      </button> 
    `;
  }

  _getInputbox() {
    return `
      <input
        type="number"
        class="winning-number mx-1 text-center"
      />
    `;
  }
  _getBonusInputbox() {
    return `
      <input type="number" class="bonus-number text-center" />
    `;
  }
}
/* 
<label class="flex-auto d-inline-block mb-3"
>지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
>
<div class="d-flex">
<div>
  <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
  <div>
    <input
      type="number"
      class="winning-number mx-1 text-center"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
    />
    <input
      type="number"
      class="winning-number mx-1 text-center"
    />
  </div>
</div>
<div class="bonus-number-container flex-grow">
  <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
  <div class="d-flex justify-center">
    <input type="number" class="bonus-number text-center" />
  </div>
</div>
</div>
<button
type="submit"
class="open-result-modal-button mt-5 btn btn-cyan w-100"
>
결과 확인하기
</button> */
