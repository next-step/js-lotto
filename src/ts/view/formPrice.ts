import el from '../dom.js'
import View from './index.js'

export default class FormPrice extends View {
  static #template = `
  <form class="mt-5">
    <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
    <div class="d-flex">
      <input type="number" class="w-100 mr-2 pl-2 input-price" placeholder="구입 금액" />
      <button type="submit" class="btn btn-cyan">확인</button>
    </div>
  </form>
  `

  $input
  $form

  constructor() {
    super()
    this.$form = el(FormPrice.#template)
    this.$input = this.$form.querySelector('.input-price') as HTMLInputElement
    this.$form.addEventListener('submit', this.onSubmit)
    el(this, [this.$form])
  }
  onSubmit = (e: Event) => {
    e.preventDefault()
    this.emit('submit@formPrice', { price: this.$input.value || 0 })
    this.$input.value = ''
  }
  focus = () => {
    this.$input.focus()
  }
  connectedCallback() {
    this.$input.focus()
  }
}
