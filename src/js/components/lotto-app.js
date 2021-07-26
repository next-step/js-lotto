import { Component } from '../core/component.js'

const template = `
  <div id="app" class="p-3">
    <div class="d-flex justify-center mt-5">
      <div class="w-100">
        <h1 class="text-center">🎱 행운의 로또</h1>
        <order-form @buy="log"></order-form>
        <ticket-section></ticket-section>
        <result-form></result-form>
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
      methods: {
        log({ detail }) {
          console.log(detail)
        },
      },
    })
  }
}

window.customElements.define('lotto-app', LottoApp)
