import { Component } from '../core/component.js'

const ticketTemplate = `
  <lotto-ticket data-cy="lotto-ticket"></lotto-ticket>
`

const template = `
  <section class="mt-9" data-cy="ticket-section" data-ref="section">
    <div class="d-flex">
      <label class="flex-auto my-0" data-ref="message">총 5개를 구매하였습니다.</label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input 
            type="checkbox" 
            class="lotto-numbers-toggle-button" 
            @change="handleToggle"
            data-cy="number-toggle" 
          />
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <div class="d-flex flex-wrap" data-ref="tickets">
    </div>
  </section>
`

class TicketSection extends Component {
  constructor() {
    super({
      template,
      data: {
        lottoTickets: [],
      },
      methods: {
        handleChangeNum: (num) => {
          const ticketCount = +num
          this.ref.message.textContent = `총 ${ticketCount}개를 구매하였습니다.`
          this.ref.tickets.innerHTML = ticketTemplate.repeat(ticketCount)
        },
        handleChangeVisible: (visible) => {
          const isVisible = visible === 'true'
          this.ref.section.style.visibility = isVisible ? 'visible' : 'hidden'
        },
        handleToggle: ({ target: { checked } }) => {
          this.root
            .querySelectorAll('lotto-ticket')
            .forEach(($el) => $el.setAttribute('visible', checked.toString()))
        },
      },
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'num':
        this.methods.handleChangeNum(newValue)
        break
      case 'visible':
        this.methods.handleChangeVisible(newValue)
        break
      default:
    }
  }

  static get observedAttributes() {
    return ['num', 'visible']
  }
}

window.customElements.define('ticket-section', TicketSection)
