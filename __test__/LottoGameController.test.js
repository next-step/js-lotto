import { LOTTO_MIN_PRICE } from '../src/constants/conditions'
import LottoGameController from '../src/js/ui/LottoGameController.js'

const PURCHASE_AMOUNT = 3000
const SELECTED_NUMS = '1,2,3,4,5,6'
const EXTRA_NUM = '7'

jest.mock('../src/js/ui/LottoGameView', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPurchaseAmount: async () => PURCHASE_AMOUNT,
      getLottoWinningNumbers: async () => SELECTED_NUMS,
      getExtraNumber: async () => EXTRA_NUM,
      print: jest.fn(),
    }
  })
})

describe('LottoGameController', () => {
  let controller

  beforeEach(() => {
    controller = new LottoGameController()
  })

  test('입력기를 실행해 로또 구매 금액을 받아오고, 금액 만큼 로또를 발행한다.', async () => {
    const lottoList = await controller.purchaseAndIssueLottos()
    expect(lottoList.length).toBe(PURCHASE_AMOUNT / LOTTO_MIN_PRICE)
  })

  test('당첨 번호와 보너스 번호를 입력받는다.', async () => {
    const lottoWinningNumbers = await controller.setWinningNumbers()
    expect(lottoWinningNumbers.numbers).toEqual({
      selectedNums: SELECTED_NUMS.split(',').map(Number),
      extraNum: Number(EXTRA_NUM),
    })
  })

  test('사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.', async () => {
    const lottoWinningNumbers = await controller.setWinningNumbers()
    const purchasedLottoList = await controller.purchaseAndIssueLottos()
    const result = controller.calculateResults(
      lottoWinningNumbers,
      purchasedLottoList,
    )
    const regExp =
      /당첨 통계\n-+\n3개 일치.*\n4개 일치.*\n5개 일치.*\n5개 일치, 보너스 볼 일치.*\n6개 일치.*\n총 수익률은 \d+(\.\d{2})?%입니다\./

    expect(controller.formatLottoResults(result)).toMatch(regExp)
  })
})
