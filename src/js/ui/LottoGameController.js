import LottoGameView from './LottoGameView.js'
import LottoVendingMachine from '../domain/LottoVendingMachine.js'
import LottoWinningCalculator from '../domain/LottoWinningCalculator.js'
import LottoWinningNumbers from '../domain/LottoWinningNumbers.js'
import { PROMPT } from '../../constants/prompt.js'

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
    const purchasedLottoList = await this.purchaseAndIssueLottos()
    const lottoWinningNumbers = await this.setWinningNumbers()
    const result = this.calculateResults(
      lottoWinningNumbers,
      purchasedLottoList,
    )
    const formattedResult = this.#formatLottoResults(result)

    this.#view.print(formattedResult)
    process.exit()
  }

  async purchaseAndIssueLottos() {
    // 입력기를 실행해 로또 구매 금액을 입력받는다.
    const purchaseAmount = await this.#view.getPurchaseAmount()

    // 로또 판매기에 구매 금액을 입력해 로또 목록을 받아온다.
    this.#vendingMachine.purchase(purchaseAmount)
    const purchasedLottoList = this.#vendingMachine.lottos

    // 출력기에 구매한 로또 목록을 보여준다.
    purchasedLottoList.forEach((lotto) => {
      const { selectedNums, extraNum } = lotto.numbers
      const numbers = [...selectedNums, extraNum].sort((a, b) => a - b)
      this.#view.print(numbers)
    })

    // 구매한 로또 목록을 리턴한다.
    return purchasedLottoList
  }

  async setWinningNumbers() {
    // 유저가 입력한 번호를 받아온다.
    const selectedNums = (await this.#view.getLottoWinningNumbers()).split(',')
    const extraNum = await this.#view.getExtraNumber()
    // 입력된 번호를 바탕으로 로또 당첨 번호를 만들어 리턴한다.
    return new LottoWinningNumbers(selectedNums, extraNum)
  }

  calculateResults(lottoWinningNumbers, purchasedLottoList) {
    // 로또 당첨 번호를 전달해 각 로또의 당첨 상태를 변경하고 이를 가져온다.
    const purchasedLottoStatuses = this.#getLottoStatus(
      lottoWinningNumbers.numbers,
      purchasedLottoList,
    )
    // 로또 상태를 바탕으로 수익률을 계산한다.
    this.#winningCalculator.calculate(purchasedLottoStatuses)

    // 수익률을 리턴한다.
    return this.#winningCalculator.result
  }

  #getLottoStatus(lottoWinningNumbers, purchasedLottoList) {
    return purchasedLottoList.map((lotto) => {
      lotto.setStatus(lottoWinningNumbers)
      return lotto.status
    })
  }

  #formatLottoResults(result) {
    const mapping = {
      3: PROMPT.LOTTO_MATCHING_RESULTS[3],
      4: PROMPT.LOTTO_MATCHING_RESULTS[4],
      5: PROMPT.LOTTO_MATCHING_RESULTS[5],
      5.5: PROMPT.LOTTO_MATCHING_RESULTS[5.5],
      6: PROMPT.LOTTO_MATCHING_RESULTS[6],
    }

    const output = Object.keys(mapping).reduce((acc, key) => {
      return acc + `${mapping[key]} - ${result[key]}개\n`
    }, '')

    return output + `총 수익률은 ${result.profitRate}%입니다.`
  }
}

export default LottoGameController
