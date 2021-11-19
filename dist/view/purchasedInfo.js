import View from './index.js';
import el from '../dom.js';
export default class PurchasedInfo extends View {
    $amountLabel;
    $toggle;
    $ul;
    static template = `
  <section class="mt-9">
    <div class="d-flex">
      <label class="flex-auto my-0 amount-label" data-cy="amount-label">총 5개를 구매하였습니다.</label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" class="lotto-numbers-toggle-button" data-cy="toggle-button">
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <ul class="d-flex flex-wrap picked-list" data-cy="picked-list"></ul>
  </section>
  `;
    constructor() {
        super();
        const $content = el(PurchasedInfo.template);
        this.$ul = $content.querySelector('.picked-list');
        this.$amountLabel = $content.querySelector('.amount-label');
        this.$toggle = $content.querySelector('.lotto-numbers-toggle-button');
        this.$toggle.addEventListener('change', this.onToggle);
        el(this, [$content]);
    }
    onToggle = () => {
        const checked = this.$toggle.checked;
        this.classList[checked ? 'add' : 'remove']('showDetail');
    };
    onPurchased(data) {
        el(this.$ul, data.map(d => el('<li class="mx-1 text-4xl picked-item">', [
            '<span class="icon">🎟️</span>',
            `<span class="numbers">${d.join(', ')}</span>`,
        ])));
        this.$amountLabel.textContent = `총 ${data.length}개를 구매하였습니다.`;
        return this;
    }
}
//# sourceMappingURL=purchasedInfo.js.map