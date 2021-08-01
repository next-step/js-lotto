import { Component } from '../core/component.js'

const template = `
  <form class="mt-5" data-cy="order-form" @submit="buyLotto">
    <label class="mb-2 d-inline-block">
      구입할 금액을 입력해주세요.
    </label>
    <div class="d-flex">
      <input
        type="number"
        min="1000"
        max="10000"
        class="w-100 mr-2 pl-2"
        placeholder="구입 금액"
        data-prop-value="price"
        @input="changePrice"
        data-cy="order-input" />
      <button 
        type="submit" 
        class="btn btn-cyan" 
        data-cy="order-btn"
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
        buyLotto(e) {
          e.preventDefault()
          const price = +this.data.price
          const isValidPrice = this.methods.validateAmount(price)

          if (!isValidPrice) {
            window.alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.')
            return
          }

          this.emit('buy', price)
        },
        validateAmount(amount) {
          const isSmallerThanMin = amount < 1000
          const isLagerThanMax = amount > 10000
          const isMultipleOf1000 = amount % 1000 === 0

          return !(isSmallerThanMin || isLagerThanMax || !isMultipleOf1000)
        },
        clear: () => {
          this.data.price = ''
        },
      },
    })
  }
}

window.customElements.define('order-form', OrderForm)
