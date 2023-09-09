import { createEl, getEl } from '../utils/dom'
import { lottoStore } from '../store/index'
import { LOTTO_ACTIONS_TYPE } from '../constants/store'
import { createSignal } from '../utils/createSignal'

export const OrderAmountField = target => {
  const [payment, setPayment] = createSignal()

  const Element = createEl(`
    <form class="mt-5">
      <label for="amount-input" class="mb-2 d-inline-block">구입할 금액을 입력해주세요. </label>
      <div class="d-flex">
        <input
          type="number"
          id="amount-input"
          class="w-100 mr-2 pl-2"
          placeholder="구입 금액"
        />
        <button type="button" class="btn btn-cyan">확인</button>
      </div>
    </form>
  `)

  const handleSubmit = e => {
    e.preventDefault()
    handleUpdatePayment()
  }

  const handleChangePayment = e => {
    setPayment(e.currentTarget.value)
  }

  const handleUpdatePayment = () => {
    const Input = getEl('input', Element)
    const Button = getEl('button', Element)

    lottoStore.dispatch(LOTTO_ACTIONS_TYPE.UPDATE_PAYMENT, {
      paymentText: payment(),
      onSuccess: () => {
        Input.setAttribute('disabled', true)
        Button.setAttribute('disabled', true)
      },
      onError: error => {
        alert(error.message)
      }
    })
  }

  return {
    render: () => {
      const Input = getEl('input', Element)
      const Button = getEl('button', Element)

      Element.addEventListener('submit', handleSubmit)
      Input.addEventListener('keyup', handleChangePayment)
      Button.addEventListener('click', handleUpdatePayment)

      target.append(Element)
    },
    destroy: () => {
      const Input = getEl('input', Element)
      const Button = getEl('button', Element)

      Element.removeEventListener('submit', handleSubmit)
      Input.removeEventListener('keyup', handleChangePayment)
      Button.removeEventListener('click', handleUpdatePayment)
    }
  }
}
