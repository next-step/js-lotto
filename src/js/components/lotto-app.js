import { Component } from '../core/component.js'

const template = `
  <div id="app" class="p-3" data-cy="lotto-app">
    <div class="d-flex justify-center mt-5">
      <div class="w-100">
        <h1 class="text-center">🎱 행운의 로또</h1>
        <order-form @buy="handleBuyLotto"></order-form>
        <ticket-section 
          data-attr-num="lottoNum" 
          data-attr-visible="isTicketSectionVisible">
        </ticket-section>
        <result-form
          data-attr-visible="isResultFormVisible">
        </result-form>
      </div>
    </div>
    <!-- modal -->
    <modal-popup></modal-popup>
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
      },
      methods: {
        handleBuyLotto({ detail }) {
          this.data.lottoNum = detail / 1000
          this.data.isTicketSectionVisible = true
          this.data.isResultFormVisible = true
        },
      },
    })
  }
}

window.customElements.define('lotto-app', LottoApp)
