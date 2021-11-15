import LottoService from './LottoService.js'

const mockLottoNumbers = [
  [23, 45, 43, 32, 1, 4],
  [13, 23, 34, 27, 39, 4],
  [4, 15, 19, 28, 35, 34],
  [41, 28, 4, 5, 3, 51],
  [13, 18, 24, 32, 42, 37],
]

const mockLottoAnswer = { base: [23, 45, 43, 32, 1, 3], bonus: 4 }

describe('로또 서비스 로직의 테스트를 진행한다.', () => {
  const lottoService = new LottoService()

  it('로또 설정값 정보를 가져오는데 성공한다', () => {
    const price = lottoService.lottoPrice

    expect(price).toBe(1000)
  })

  it('로또 번호 생성에 성공한다.', () => {
    lottoService.autoPurchase(2, mockLottoNumbers)

    expect(lottoService.myLottos[0]).toStrictEqual(mockLottoNumbers[0])

    expect(lottoService.myLottos[1]).toStrictEqual(mockLottoNumbers[1])
  })

  it('수익률을 계산할 수 있다.', () => {
    lottoService.lottoAnswer = mockLottoAnswer

    expect(typeof lottoService.calcLottoBenefitRate()).toBe('number')
  })

  it('게임을 다시 시작하면 로또의 개수가 초기화된다', () => {
    expect(lottoService.myLottos.length).toBe(2)
    lottoService.setInit()
    expect(lottoService.myLottos.length).toBe(0)
  })
})
