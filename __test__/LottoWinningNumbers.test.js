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

    test('to be truthy', () => {
      expect(() => new LottoWinningNumbers(validNumbers)).toBeTruthy()
    })

    test('to be throw', () => {
      expect(() => new LottoWinningNumbers(invalidNumbers)).toThrow()
    })
  })
  describe('- 당첨 번호가 서로 중복될 경우 에러를 출력한다.', () => {})
  describe('-1 ~ 45의 범위 이내의 숫자가 입력되지 않은 경우 에러를 출력한다.', () => {})
})
