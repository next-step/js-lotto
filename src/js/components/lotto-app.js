import { Prize } from '../constants/prize.js'
import { Component } from '../core/component.js'

const template = `
  <div id="app" class="p-3" data-cy="lotto-app">
    <div class="d-flex justify-center mt-5">
      <div class="w-100">
        <h1 class="text-center">🎱 행운의 로또</h1>
        <order-form @buy="handleBuyLotto" data-ref="orderForm"></order-form>
        <ticket-section 
          data-prop-num="lottoNum" 
          data-prop-visible="isTicketSectionVisible"
          data-ref="ticketSection"
        >
        </ticket-section>
        <result-form
          data-prop-visible="isResultFormVisible"
          @check="handleCheckResult"
          data-ref="resultForm"
        >
        </result-form>
      </div>
    </div>
    <modal-popup 
      data-ref="modal"
      data-prop-visible="isModalVisible"
      @reset="handleReset"
    >
    </modal-popup>
  </div>
`

class LottoApp extends Component {
  constructor() {
    super({
      template,
      data: {
        lottoNum: 0,
        isTicketSectionVisible: false,
        isResultFormVisible: false,
        isModalVisible: false,
      },
      methods: {
        handleBuyLotto: ({ detail }) => {
          this.data.lottoNum = detail / 1000
          this.data.isTicketSectionVisible = true
          this.data.isResultFormVisible = true
        },
        handleCheckResult: ({ detail: { nums, bonus } }) => {
          const result = this.ref.ticketSection.methods.checkResult({ nums, bonus })
          const prize = this.methods.getPrize(result)
          const earningRate = this.methods.getEarningRate(prize)

          // update modal
          this.ref.modal.methods.updateResult(prize, earningRate)
          // show modal
          this.data.isModalVisible = true
        },
        getPrize: (result) => {
          const prize = {
            1: { count: 0, prize: Prize['1st'] },
            2: { count: 0, prize: Prize['2nd'] },
            3: { count: 0, prize: Prize['3rd'] },
            4: { count: 0, prize: Prize['4th'] },
            5: { count: 0, prize: Prize['5th'] },
          }

          result.forEach((res) => {
            const rank = this.methods.getRank(res)
            if (!rank) return
            prize[rank].count += 1
          })

          return prize
        },
        getRank: ({ count, bonus }) => {
          if (count === 6) {
            return 1
          }
          if (count === 5 && bonus) {
            return 2
          }
          if (count === 5) {
            return 3
          }
          if (count === 4) {
            return 4
          }
          if (count === 3) {
            return 5
          }
          return 0
        },
        getEarningRate: (prizeResult) => {
          const totalAmount = this.data.lottoNum * 1000
          const totalPrize = Object.values(prizeResult)
            .map(({ count, prize }) => count * prize)
            .reduce((total, p) => total + p, 0)

          return (totalPrize / totalAmount) * 100
        },
        handleReset: () => {
          this.data.isTicketSectionVisible = false
          this.data.isResultFormVisible = false
          this.data.isModalVisible = false
          this.ref.orderForm.methods.clear()
          this.ref.resultForm.methods.clear()
        },
      },
    })
  }
}

window.customElements.define('lotto-app', LottoApp)
