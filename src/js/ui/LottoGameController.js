import LottoGameView from './LottoGameView.js'
import LottoVendingMachine from '../domain/LottoVendingMachine.js'
import LottoWinningCalculator from '../domain/LottoWinningCalculator.js'
import LottoWinningNumbers from '../domain/LottoWinningNumbers.js'

class LottoGameController {
  #view
  #vendingMachine
  #winningCalculator

  constructor(view = new LottoGameView()) {
    this.#view = view
    this.#vendingMachine = new LottoVendingMachine()
    this.#winningCalculator = new LottoWinningCalculator()
  }

  async run() {
    /* 로또 구매 및 발행 */
    // 입력기를 실행해 로또 구매금액을 입력받는다.
    const purchaseAmount = await this.#view.getPurchaseAmount()

    // 로또 판매기에 구매금액을 입력해 로또 목록을 받아온다.
    this.#vendingMachine.purchase(purchaseAmount)
    const purchasedLottoList = this.#vendingMachine.lottos

    // 출력기에 구매한 로또 목록을 보여준다.
    purchasedLottoList.forEach((lotto) => {
      const { selectedNums, extraNum } = lotto.numbers
      const numbers = [...selectedNums, extraNum].sort((a, b) => a - b)
      this.#view.print(numbers)
    })

    /* 로또 당첨 번호 세팅 */
    const selectedNums = (await this.#view.getLottoWinningNumbers()).split(',')
    const extraNum = await this.#view.getExtraNumber()
    const lottoWinningNumbers = new LottoWinningNumbers(selectedNums, extraNum)

    // 로또 목록에 당첨 번호를 전달해 당첨 갯수 상태를 변경한다.
    const purchasedLottoStatuses = this.#getLottoStatus(
      lottoWinningNumbers.numbers,
      purchasedLottoList,
    )

    // 변경된 로또의 상태목록을 로또 당첨 확인기에 전달한다.
    this.#winningCalculator.calculate(purchasedLottoStatuses)
    const result = this.#winningCalculator.result
    const formattedResult = this.#formatLottoResults(result)

    // 출력기에 당첨 갯수와 수익률을 전달한다.
    this.#view.print(formattedResult)

    // 게임을 종료한다.
    process.exit()
  }

  #getLottoStatus(lottoWinningNumbers, purchasedLottoList) {
    const purchasedLottoStatuses = purchasedLottoList.map((lotto) => {
      lotto.setStatus(lottoWinningNumbers)
      return lotto.status
    })

    return purchasedLottoStatuses
  }

  #formatLottoResults(result) {
    const mapping = {
      3: '3개 일치 (5,000원)',
      4: '4개 일치 (50,000원)',
      5: '5개 일치 (1,500,000원)',
      5.5: '5개 일치, 보너스 볼 일치 (30,000,000원)',
      6: '6개 일치 (2,000,000,000원)',
    }

    let output = ''

    console.log(result)

    for (const key in mapping) {
      output += `${mapping[key]} - ${result[key]}개\n`
    }

    output += `총 수익률은 ${result.profitRate}%입니다.`

    return output
  }
}

export default LottoGameController
