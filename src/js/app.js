import { createEl, getEl } from './utils/dom'
import { OrderAmountField as OrderAmountFieldComponent } from './components/OrderAmountField'
import { LottoTicketList as LottoTicketListComponent } from './components/LottoTicketList'
import { LottoNumberField as LottoNumberFieldComponent } from './components/LottoNumberField'
import { ResultModal as ResultModalComponent } from './components/ResultModal'
import { lottoStore } from './store/index'
import { LOTTO_ACTIONS_TYPE } from './constants/store'
import { createSignal } from './utils/createSignal'

export const LottoApp = target => {
  const [isOpenResultModal, setIsOpenResultModal] = createSignal(false)
  const [components, setComponents] = createSignal({
    OrderAmountField: null,
    LottoTicketList: null,
    LottoNumberField: null,
    ResultModal: null
  })

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

  const handleIsOpenModal = isOpen => () => {
    const { ResultModal } = components()

    setIsOpenResultModal(isOpen)
    ResultModal.render()
  }

  const handleReset = () => {
    destroy()

    const root = getEl('#app')
    root.innerHTML = ''

    render()
  }

  const destroy = () => {
    lottoStore.dispatch(LOTTO_ACTIONS_TYPE.UPDATE_RETRY, { answer: 'y' })

    const children = components()
    Object.keys(children).forEach(key => children[key].destroy())
  }

  const render = () => {
    const Element = createEl(template)

    const OrderAmountField = new OrderAmountFieldComponent(
      getEl('#order-amount-field-wrapper', Element)
    )
    const LottoTicketList = new LottoTicketListComponent(
      getEl('#lotto-ticket-list-wrapper', Element)
    )
    const LottoNumberField = new LottoNumberFieldComponent(
      getEl('#lotto-number-field-wrapper', Element),
      { onOpenModal: handleIsOpenModal(true) }
    )
    const ResultModal = new ResultModalComponent(Element, {
      isOpen: isOpenResultModal,
      onReset: handleReset,
      onClose: handleIsOpenModal(false)
    })

    setComponents({
      OrderAmountField,
      LottoTicketList,
      LottoNumberField,
      ResultModal
    })

    OrderAmountField.render()
    LottoTicketList.render()
    LottoNumberField.render()
    ResultModal.render()

    lottoStore.subscribe(LottoTicketList.update)
    target.append(Element)
  }

  return {
    render
  }
}
