import Lotto from '../src/js/domain/Lotto'

describe('Lotto', () => {
  let lotto
  let lottoNumbers
  let totalLottoNumbers

  beforeEach(() => {
    lotto = new Lotto()
    lottoNumbers = lotto.numbers
    totalLottoNumbers = [...lotto.numbers.selectedNums, lotto.numbers.extraNum]
  })
  test('로또는 7개의 번호가 한 줄이어야 한다.', () => {
    expect(totalLottoNumbers.length).toBe(7)
  })

  test('6개의 당첨 번호와, 1개의 보너스 번호로 이루어진다.', () => {
    expect(lottoNumbers.selectedNums.length).toBe(6)
    expect(lottoNumbers.extraNum >= 1).toBe(true)
  })

  test('로또 번호는 서로 중복되지 않는다.', () => {
    expect(new Set(totalLottoNumbers).size).toBe(totalLottoNumbers.length)
  })

  test('당첨 번호와 비교해 몇 개의 로또가 맞았는지 상태를 기억해야 한다.', () => {
    // Given
    const winningLottoNumbers = {
      selectedNums: [5, 6, 10, 11, 12, 43],
      extraNum: 15,
    }
    lotto.setStatus(winningLottoNumbers)

    // When
    const status = lotto.status

    // Then
    expect(status.matchSelectedNums >= 0).toBe(true)
    expect(status.matchExtraNum >= 0).toBe(true)
  })
})

describe('- 로또 번호는 1 ~ 45의 범위 이내여야 한다.', () => {
  // Given
  const lotto = new Lotto()

  // When
  const lottoNumbers = [...lotto.numbers.selectedNums, lotto.numbers.extraNum]

  // Then
  test.each(lottoNumbers)('%s', (num) => {
    expect(num >= 1 && num <= 45).toBe(true)
  })
})
