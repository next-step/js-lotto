import LottoWinningCalculator from '../src/js/domain/LottoWinningCalculator'

describe('LottoWinningCalculator', () => {
  let winningCalculator

  beforeEach(() => {
    // Given
    winningCalculator = new LottoWinningCalculator()
  })

  test('당첨 갯수를 토대로 총 등수와 수익률을 계산한다.', () => {
    // When
    const purchasedLottoStatus = [
      {
        matchSelectedNums: 3,
        matchExtraNum: 0,
      },
      {
        matchSelectedNums: 0,
        matchExtraNum: 0,
      },
      {
        matchSelectedNums: 0,
        matchExtraNum: 0,
      },
      {
        matchSelectedNums: 0,
        matchExtraNum: 0,
      },
      {
        matchSelectedNums: 0,
        matchExtraNum: 0,
      },
      {
        matchSelectedNums: 0,
        matchExtraNum: 0,
      },
      {
        matchSelectedNums: 0,
        matchExtraNum: 0,
      },
      {
        matchSelectedNums: 0,
        matchExtraNum: 0,
      },
    ]

    winningCalculator.calculate(purchasedLottoStatus)
    const result = winningCalculator.result
    const expectedResult = {
      3: 1,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
      profitRate: 62.5,
    }

    // Then
    expect(result).toEqual(expectedResult)
  })
})
