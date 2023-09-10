import { PROMPT } from '../../constants/prompt.js'
import LottoGameView from './LottoGameView.js'

class LottoGameViewWeb extends LottoGameView {
  constructor() {
    super()
  }

  async getPurchaseAmount() {
    return new Promise(async (resolve, reject) => {
      const button = document.getElementById('purchase-button')

      button.addEventListener('click', async () => {
        const input = document.getElementById('purchase-amount-input')
        const purchaseAmount = input.value
        resolve(purchaseAmount)
      })
    })
  }

  async getLottoWinningNumbers() {
    const { selectedNums, extraNum } = await this.#createButtonClickPromise()
    return { selectedNums: selectedNums, extraNum }
  }

  async getRestart() {}

  printPurchasedLottos(purchasedLottoList) {
    const lottoAmount = purchasedLottoList.length

    // 구매한 갯수 출력
    const view = document.getElementById('purchased-amount-view')
    const message = `총 ${lottoAmount}개를 구매하였습니다.`
    view.textContent = message

    // 로또 이미지, 로또 번호 출력
    const lottoWrapper = document.getElementById('ticket-image-wrapper')
    purchasedLottoList.forEach((lotto) => {
      const { selectedNums, extraNum } = lotto.numbers
      const numbers = [...selectedNums, extraNum].sort((a, b) => a - b)

      const ticketWrapper = document.createElement('div')
      ticketWrapper.className = 'd-flex items-center'

      const ticketElement = document.createElement('span')
      ticketElement.className = 'mx-1 text-4xl'
      ticketElement.textContent = '🎟️'

      const numberElement = document.createElement('span')
      numberElement.className = 'mx-1 text-base'
      numberElement.textContent = numbers.join(', ')

      ticketWrapper.appendChild(ticketElement)
      ticketWrapper.appendChild(numberElement)

      lottoWrapper.appendChild(ticketWrapper)
    })
  }

  #createButtonClickPromise() {
    return new Promise((resolve) => {
      const button = document.querySelector('.open-result-modal-button')
      button.addEventListener('click', () => {
        // 일반 번호들 가져오기
        const selectedNumsElements =
          document.querySelectorAll('.selected-number')
        const selectedNums = Array.from(selectedNumsElements).map((input) =>
          Number(input.value),
        )

        // 보너스 번호 가져오기
        const extraNumInput = document.querySelector('.bonus-number')
        const extraNum = Number(extraNumInput.value)

        // 입력된 번호 컨트롤러로 전달
        resolve({ selectedNums, extraNum })

        // 모달창 열기
        const modal = document.querySelector('.modal')
        modal.classList.add('open')
      })
    })
  }

  printResult(result) {
    const threeEl = document.querySelector('#match-three')
    const fourEl = document.querySelector('#match-four')
    const fiveEl = document.querySelector('#match-five')
    const extraEl = document.querySelector('#match-extra')
    const sixEl = document.querySelector('#match-six')

    threeEl.textContent = result[3] + '개'
    fourEl.textContent = result[4] + '개'
    fiveEl.textContent = result[5] + '개'
    extraEl.textContent = result[5.5] + '개'
    sixEl.textContent = result[6] + '개'

    const profitRateEl = document.querySelector('#profit-rate')
    profitRateEl.textContent = `당신의 총 수익률은 ${result.profitRate}%입니다.`
  }

  print(prompt) {}
}

export default LottoGameViewWeb

/*
            <div class="d-flex items-center">
                <span class="mx-1 text-4xl">🎟️</span>
                <span class="mx-1 text-base">2, 3, 4, 5, 6, 7, 8</span>
              </div>
*/
