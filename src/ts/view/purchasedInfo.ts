import View from './index.js'
import el from '../dom.js'
import { LottoSet } from '../constants.js'

export default class PurchasedInfo extends View {
  $amountLabel
  $toggle
  $ul

  constructor() {
    super()
    this.$amountLabel = el(
      '<label class="flex-auto my-0" data-cy="amount-label">총 5개를 구매하였습니다.</label>',
    ) as HTMLLabelElement
    this.$toggle = el(
      '<input type="checkbox" class="lotto-numbers-toggle-button" data-cy="toggle-button">',
    ) as HTMLInputElement
    this.$ul = el('<ul class="d-flex flex-wrap picked-list" data-cy="picked-list"></ul>') as HTMLUListElement
    this.$toggle.addEventListener('change', this.onToggle)

    el(this, [
      el('<section class="mt-9">', [
        el('<div class="d-flex">', [
          this.$amountLabel,
          el('<div class="flex-auto d-flex justify-end pr-1">', [
            el('<label class="switch">', [this.$toggle, '<span class="text-base font-normal">번호보기</span>']),
          ]),
        ]),
        this.$ul,
      ]),
    ])
  }

  onToggle = () => {
    const checked = this.$toggle.checked
    this.classList[checked ? 'add' : 'remove']('showDetail')
  }

  onPurchased(data: LottoSet[]) {
    el(
      this.$ul,
      data.map(d =>
        el('<li class="mx-1 text-4xl picked-item">', [
          '<span class="icon">🎟️</span>',
          `<span class="numbers">${d.join(', ')}</span>`,
        ]),
      ),
    )
    this.$amountLabel.textContent = `총 ${data.length}개를 구매하였습니다.`
    return this
  }
}
