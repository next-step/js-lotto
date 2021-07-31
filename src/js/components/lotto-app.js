import { Component } from '../core/component.js'

const template = `
  <div id="app" class="p-3" data-cy="lotto-app">
    <div class="d-flex justify-center mt-5">
      <div class="w-100">
        <h1 class="text-center">🎱 행운의 로또</h1>
        <order-form @buy="handleBuyLotto"></order-form>
        <ticket-section 
          data-attr-num="lottoNum" 
          data-attr-visible="isTicketSectionVisible"
          data-ref="ticketSection"
        >
        </ticket-section>
        <result-form
          data-attr-visible="isResultFormVisible"
          @check="handleCheckResult"
        >
        </result-form>
      </div>
    </div>
    <!-- modal -->
    <modal-popup data-ref="modal"
      data-attr-visible="isModalVisible"
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
        handleBuyLotto({ detail }) {
          this.data.lottoNum = detail / 1000
          this.data.isTicketSectionVisible = true
          this.data.isResultFormVisible = true
        },
        handleCheckResult({ detail: { nums, bonus } }) {
          const result = this.ref.ticketSection.methods.checkResult({ nums, bonus })
          const prize = {
            1: { count: 0, prize: 2_000_000_000 },
            2: { count: 0, prize: 30_000_000 },
            3: { count: 0, prize: 1_500_000 },
            4: { count: 0, prize: 50_000 },
            5: { count: 0, prize: 5_000 },
          }

          result.forEach((res) => {
            const rank = this.methods.getRank(res)
            if (!rank) return
            prize[rank].count += 1
          })

          const totalPrize = Object.values(prize).reduce((acc, { count, prize: p }) => acc + count * p, 0)
          const earningRate = (totalPrize / (this.data.lottoNum * 1000)) * 100

          // update modal
          this.ref.modal.methods.updateResult(prize, earningRate)
          // show modal
          this.data.isModalVisible = true
        },
        getRank({ count, bonus }) {
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
      },
    })
  }
}

window.customElements.define('lotto-app', LottoApp)
