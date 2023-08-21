import {
  isInLottoRange,
  checkBonusNumber,
  checkValidWinNumberList
} from '../../../src/js/services/lotto/lottoValidate'

describe('services/lottoValidate', () => {
  describe('isInLottoRange()', () => {
    it.each([[1], [2], [31], [40], [45]])(
      '숫자를 인자로 받고 1 ~ 45 내에 해당하는 숫자인 경우, true를 반환한다.',
      num => {
        // Given, When
        const result = isInLottoRange(num)

        // Then
        expect(result).toBe(true)
      }
    )

    it.each([[0], [46], [-1], [-45]])(
      '숫자를 인자로 받고 1 ~ 45 내에 해당하는 숫자가 아닌 경우, false를 반환한다.',
      num => {
        // Given, When
        const result = isInLottoRange(num)

        // Then
        expect(result).toBe(false)
      }
    )
  })

  describe('checkBonusNumber()', () => {
    it.each([[1], [45], [20], [33], [42]])(
      '보너스 번호가 1 ~ 45내에 존재하고 당첨 번호에 없는 유효한 숫자인 경우 에러가 발생하지 않는다.',
      bonusNumber => {
        // Given
        const winNumberList = [2, 3, 4, 5, 6, 7]

        // When, Then
        expect(() => {
          checkBonusNumber(bonusNumber, winNumberList)
        }).not.toThrow()
      }
    )

    it.each([[NaN], [undefined], [null], [{}], [[]], ['string']])(
      '보너스 번호가 숫자가 아닌 경우, 에러가 발생한다.',
      bonusNumber => {
        // When, Then
        expect(() => {
          checkBonusNumber(bonusNumber, [])
        }).toThrow(new Error('⚠️ 보너스 번호는 숫자로만 입력해야 합니다! ⚠️\n'))
      }
    )

    it.each([[0], [46], [-1], [-45]])(
      '보너스 번호가 1 ~ 45 내에 해당되지 않는 경우 에러가 발생한다.',
      bonusNumber => {
        // When, Then
        expect(() => {
          checkBonusNumber(bonusNumber, [])
        }).toThrow(
          new Error(
            '⚠️ 보너스 번호는 1부터 45 이하로만 입력이 가능합니다! ⚠️\n'
          )
        )
      }
    )

    it.each([[1], [2], [3], [4], [5], [6]])(
      '보너스 번호가 당첨 번호에 있는 숫자인 경우 에러가 발생한다.',
      bonusNumber => {
        // Given
        const winNumberList = [1, 2, 3, 4, 5, 6]

        // When, Then
        expect(() => {
          checkBonusNumber(bonusNumber, winNumberList)
        }).toThrow(
          new Error(
            '⚠️ 보너스 번호는 당첨 번호에 없는 숫자로만 입력해야 합니다! ⚠️\n'
          )
        )
      }
    )
  })

  describe('checkValidWinNumberList()', () => {
    it.each([['1,2,3,4,5,6'], ['2,3,4,5,6,7'], ['1,10,20,30,40,45']])(
      '당첨 번호들을 문자열로 받고 1 ~ 45내에 존재하는 중복되지 않는 숫자들로 6개가 구성된 경우 에러가 발생하지 않는다.',
      winNumberText => {
        // When, Then
        expect(() => {
          checkValidWinNumberList(winNumberText)
        }).not.toThrow()
      }
    )

    it.each([
      ['NaN, 2,3,4,5,6'],
      ['undefined, 2,3,4,5,6'],
      ['null, 2,3,4,5,6'],
      ['{}, 2,3,4,5,6'],
      ['[],2,3,4,5,6'],
      ['string,2,3,4,5,6']
    ])(
      '당첨 번호들을 문자열로 받고 당첨 번호가 숫자가 아닌 경우 에러가 발생한다.',
      winNumberText => {
        // When, Then
        expect(() => {
          checkValidWinNumberList(winNumberText)
        }).toThrow(new Error('⚠️ 딩첨 번호는 숫자로만 입력해야 합니다! ⚠️\n'))
      }
    )

    it.each([['1,1,2,3,4,5', '1,1,1,1,1,1', '1,2,3,4,5,5']])(
      '당첨 번호들을 문자열로 받고 당첨 번호에 중복된 숫자가 있는 경우 에러가 발생한다.',
      winNumberText => {
        // When, Then
        expect(() => {
          checkValidWinNumberList(winNumberText)
        }).toThrow(
          new Error('⚠️ 당첨 번호는 중복 없이 6개를 입력해야 합니다! ⚠️\n')
        )
      }
    )

    it.each([['1', '1,2', '1,2,3', '1,2,3,4', '1,2,3,4,5', '1,2,3,4,5,6,7']])(
      '당첨 번호들을 문자열로 받고 당첨 번호가 6개가 아닌 경우 에러가 발생한다.',
      winNumberText => {
        // When, Then
        expect(() => {
          checkValidWinNumberList(winNumberText)
        }).toThrow(
          new Error('⚠️ 당첨 번호는 중복 없이 6개를 입력해야 합니다! ⚠️\n')
        )
      }
    )

    it.each([['0,46,2,3,4,5', '-1,-45,2,3,4,5']])(
      '당첨 번호들을 문자열로 받고 당첨 번호가 1 ~ 45 내에 해당되지 않는 경우 에러가 발생한다.',
      winNumberText => {
        // When, Then
        expect(() => {
          checkValidWinNumberList(winNumberText)
        }).toThrow(
          new Error('⚠️ 당첨 번호는 1부터 45 이하로만 입력이 가능합니다! ⚠️\n')
        )
      }
    )
  })
})
