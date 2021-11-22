import View from '../index.js'
import el from '../../dom.js'
import FormDetailEntryClass from './formDetailEntry.js'
import { FormDetailEntryView } from '../../constants.js'

customElements.define('detail-entry', FormDetailEntryClass)

export default class FormDetails extends View {
  static #template = `
  <section class="mt-9">
    <div class="d-flex">
      <label class="flex-auto my-0 label-amount">총 0개를 구매하였습니다.</label>
    </div>
    <form class="mt-5">
      <label>전체 자동/반자동<input class="input-toggle-all" type="checkbox"></label>
      <ul class="detail-list"></ul>
      <button class="btn-submit" type="submit">완료</button>
    </form>
  </section>
  `

  $amountLabel
  $form
  $toggleAll
  $ul
  $submit
  $entries: FormDetailEntryView[]

  constructor() {
    super()
    const $content = el(FormDetails.#template)

    this.$amountLabel = $content.querySelector('.label-amount') as HTMLLabelElement
    this.$form = $content.querySelector('form') as HTMLFormElement
    this.$toggleAll = $content.querySelector('.input-toggle-all') as HTMLInputElement
    this.$ul = $content.querySelector('.detail-list') as HTMLUListElement
    this.$submit = $content.querySelector('.btn-submit') as HTMLButtonElement

    this.$toggleAll.addEventListener('change', this.onToggleAll)
    this.$form.addEventListener('submit', this.onSubmit)

    el(this, [$content])
  }

  focus() {
    this.$entries[0].focus()
  }

  setAvailability(flag: boolean) {
    this.$toggleAll.disabled = !flag
    this.$submit.disabled = !flag
    return this
  }

  reset() {
    this.setAvailability(true)
    this.$toggleAll.checked = false
    return this
  }

  onPurchased(amount: number) {
    this.reset()
    this.$amountLabel.textContent = `총 ${amount}개를 구매하였습니다. 숫자를 입력하세요.`
    this.$entries = [...Array(amount)].map((_, i) => el(`<detail-entry index=${i} />`)) as FormDetailEntryView[]
    el(this.$ul, this.$entries)
    return this
  }

  onSubmit = (e: Event) => {
    e.preventDefault()
    this.emit('submit@formDetails')
  }

  onToggleAll = () => {
    this.emit('toggleAll@formDetails', { checked: this.$toggleAll.checked })
  }
}
