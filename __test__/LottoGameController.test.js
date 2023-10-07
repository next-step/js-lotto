import { LOTTO_MIN_PRICE } from '../src/constants/conditions'
import LottoGameController from '../src/js/ui/LottoGameController.js'

const PURCHASE_AMOUNT = 3000
const SELECTED_NUMS = '1,2,3,4,5,6'
const EXTRA_NUM = '7'

jest.mock('../src/js/ui/LottoGameViewConsole', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPurchaseAmount: async () => PURCHASE_AMOUNT,
      getLottoWinningNumbers: async () => ({
        selectedNums: SELECTED_NUMS,
        extraNum: EXTRA_NUM,
      }),
      printPurchasedLottos: jest.fn(),
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
})
