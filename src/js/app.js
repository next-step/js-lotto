import { createEl, getEl } from './utils/dom'
import { OrderAmountField as OrderAmountFieldComponent } from './components/OrderAmountField'
import { LottoTicketList as LottoTicketListComponent } from './components/LottoTicketList'
import { lottoStore } from './store/index'

export const LottoApp = target => {
  const template = `
    <div id="container" class="d-flex justify-center mt-5">
      <div class="w-100" id="wrapper">
        <h1 class="text-center">🎱 행운의 로또</h1>
        <section id="order-amount-field-wrapper"></section>
        <section id="lotto-ticket-list-wrapper" class="mt-9"></section>
        <section id="lotto-number-field-wrapper"></section>
      </div>
    </div>
  `

  const render = () => {
    const Element = createEl(template)

    const OrderAmountField = new OrderAmountFieldComponent(
      getEl('#order-amount-field-wrapper', Element)
    )
    const LottoTicketList = new LottoTicketListComponent(
      getEl('#lotto-ticket-list-wrapper', Element)
    )

    OrderAmountField.render()
    LottoTicketList.render()

    lottoStore.subscribe(LottoTicketList.update)
    target.append(Element)
  }

  return {
    render
  }
}
