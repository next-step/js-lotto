import { Component } from '../core/component.js'

const template = `
  <span class="mx-1 text-4xl" data-cy="ticket">🎟️ 
    <span class="ticket-nums" data-cy="ticket-nums"></span>
  </span>
`

class LottoTicket extends Component {
  constructor() {
    super({
      template,
      data: {
        nums: [],
      },
      methods: {
        pickNums: () => {
          const nums = new Set()

          while (nums.size !== 6) {
            nums.add(Math.ceil(Math.random() * 45))
          }

          this.data.nums = [...nums]
          this.root.querySelector('.ticket-nums').textContent = this.data.nums.join(',')
        },
        showNums: () => {
          this.root.querySelector('.ticket-nums').style.visibility = 'visible'
        },
        hideNums: () => {
          this.root.querySelector('.ticket-nums').style.visibility = 'hidden'
        },
        handleChangeVisible: (visible) => {
          const isVisible = visible === 'true'
          if (isVisible) {
            this.methods.showNums()
          } else {
            this.methods.hideNums()
          }
        },
        check: (winningNums) => {
          return (
            winningNums.length === this.data.nums && winningNums.every((num) => this.data.nums.includes(num))
          )
        },
      },
      mounted() {
        this.methods.pickNums()
        this.methods.hideNums()
      },
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'visible':
        this.methods.handleChangeVisible(newValue)
        break
      default:
    }
  }

  static get observedAttributes() {
    return ['visible']
  }
}

window.customElements.define('lotto-ticket', LottoTicket)
