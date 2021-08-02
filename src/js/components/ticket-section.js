import { Message } from '../constants/message.js'
import { Component } from '../core/component.js'
import { $$ } from '../utils/index.js'

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
          this.ref.message.textContent = Message.TICKET_COUNT(ticketCount)
          this.ref.tickets.innerHTML = ticketTemplate.repeat(ticketCount)
        },
        handleChangeVisible: (isVisible) => {
          this.ref.section.style.visibility = isVisible ? 'visible' : 'hidden'
        },
        handleToggle: ({ target: { checked } }) => {
          $$('lotto-ticket', this.root).forEach(($ticket) => {
            $ticket.visible = checked
          })
        },
        checkResult: ({ nums, bonus }) => {
          return Array.from($$('lotto-ticket', this.root)).map(($ticket) => {
            return $ticket.methods.check({ nums, bonus })
          })
        },
      },
      watcher: {
        visible(isVisible) {
          this.methods.handleChangeVisible(isVisible)
        },
        num(ticketNum) {
          this.methods.handleChangeNum(ticketNum)
        },
      },
    })
  }
}

window.customElements.define('ticket-section', TicketSection)
