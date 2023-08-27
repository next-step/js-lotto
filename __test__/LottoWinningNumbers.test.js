import LottoWinningNumbers from '../src/js/domain/LottoWinningNumbers'

describe('LottoWinningNumbers', () => {
  describe('- 입력된 번호가 6개의 당첨 번호, 1개의 보너스 번호로 이루어지지 않을 경우 에러를 출력한다.', () => {
    const validNumbers = {
      selectedNums: [3, 5, 6, 7, 10, 14],
      extraNum: 45,
    }

    const invalidNumbers = {
      selectedNums: [''],
      extraNum: 45,
    }

    test('not to throw error', () => {
      expect(() => new LottoWinningNumbers(validNumbers)).not.toThrow()
    })

    test.each([
      {
        selectedNums: [''],
        extraNum: 45,
      },
      {
        selectedNums: [3],
        extraNum: 45,
      },
      {},
      null,
      [],
      undefined,
    ])('%s to throw error', (invalidNumbers) => {
      expect(() => new LottoWinningNumbers(invalidNumbers)).toThrow()
    })
  })
  describe('- 당첨 번호가 서로 중복될 경우 에러를 출력한다.', () => {
    test.each([
      {
        selectedNums: [4, 6, 10, 19, 43, 44],
        extraNum: 45,
      },
    ])('%s not to throw error', (validNumbers) => {
      expect(() => new LottoWinningNumbers(validNumbers)).not.toThrow()
    })

    test.each([
      {
        selectedNums: [3, 3, 3, 3, 3, 3],
        extraNum: 45,
      },
      {
        selectedNums: [45, 45, 45],
        extraNum: 45,
      },
    ])('%s to throw error', (invalidNumbers) => {
      expect(() => new LottoWinningNumbers(invalidNumbers)).toThrow()
    })
  })
  describe('- 1 ~ 45의 범위 이내의 숫자가 입력되지 않은 경우 에러를 출력한다.', () => {})
})
