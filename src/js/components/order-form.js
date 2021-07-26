import { Component } from '../core/component.js'

const template = `
  <form class="mt-5">
    <label class="mb-2 d-inline-block">
      구입할 금액을 입력해주세요.
    </label>
    <div class="d-flex">
      <input
        type="number"
        class="w-100 mr-2 pl-2"
        placeholder="구입 금액"
        data-model-value="price"
        @input="changePrice"
      />
      <button 
        type="button" 
        class="btn btn-cyan" 
        @click="buyLotto"
      >
        확인
      </button>
    </div>
  </form>
`

class OrderForm extends Component {
  constructor() {
    super({
      template,
      data: {
        price: '',
      },
      methods: {
        changePrice({ target: { value } }) {
          this.data.price = value
        },
        buyLotto() {
          this.emit('buy', this.data.price)
        },
      },
    })
  }
}

window.customElements.define('order-form', OrderForm)
