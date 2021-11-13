import LottoService from './LottoService.js'

const mockLottoNumbers = [
  [23, 45, 43, 32, 1, 4, 7],
  [13, 23, 34, 27, 39, 4, 5],
  [4, 15, 19, 28, 35, 34, 47],
  [41, 28, 4, 5, 3, 51, 42],
  [13, 18, 24, 32, 42, 37, 5],
]

describe('로또 서비스 로직의 테스트를 진행한다.', () => {
  const lottoService = new LottoService()

  it('로또 설정값 정보를 가져오는데 성공한다', () => {
    const price = lottoService.lottoPrice

    expect(price).toBe(1000)
  })

  it('로또 번호 생성에 성공한다.', () => {
    lottoService.autoPurchase(2, mockLottoNumbers)

    expect(lottoService.myLottos[0].base).toStrictEqual(
      mockLottoNumbers[0].slice(0, 6)
    )
    expect(lottoService.myLottos[0].bonus).toBe(mockLottoNumbers[0][6])

    expect(lottoService.myLottos[1].base).toStrictEqual(
      mockLottoNumbers[1].slice(0, 6)
    )
    expect(lottoService.myLottos[1].bonus).toBe(mockLottoNumbers[1][6])

    console.log(lottoService.myLottos)
  })
})
