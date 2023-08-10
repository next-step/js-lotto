describe(`Validating Lotto purchase test`, () => {

  it('should be a Number', () => {
    //given
    const MONEY = 'heelo'

    //then
    expect(() => validateNumber(MONEY)).toThrowError('숫자를 입력해주세요')
  })
  it('should be a greater than price of lotto', () => {
    //given
    const MONEY = 900

    //then
    expect(() => validatePrice(MONEY)).toThrowError('로또 구입 금액은 1000원 이상이어야 합니다.')
  })
  it('should be a positive number', () => {
    //given
    const MONEY = 2000.20

    //then
    expect(() => validatePositiveNumber(MONEY)).toThrowError('양의 정수를 입력해주세요')
  })

})

describe(`winning number test`, () => {
  it('should be a 6 numbers', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5]

    //then
    expect(() => validateWinningNumberCount(WINNING_NUMBER)).toThrowError('6개의 숫자를 입력해주세요')
  })

  it('winning numbers should be 1 ~ 45', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 46]

    //then
    expect(() => validateNumberRange(WINNING_NUMBER)).toThrowError('1 ~ 45 사이의 숫자를 입력해주세요')
  })

  it('winning numbers should be unique', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 5]

    //then
    expect(() => validateWinningNumberUnique(WINNING_NUMBER)).toThrowError('중복된 숫자가 있습니다.')
  })
})

describe(`bonus number test`, () => {
  it('should be a 1 number', () => {
    //given
    const WINNING_NUMBER = [1, 2]

    //then
    expect(() => validateBonusNumberCount(WINNING_NUMBER)).toThrowError('1개의 숫자를 입력해주세요')
  })

  it('winning numbers should be 1 ~ 45', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 46]

    //then
    expect(() => validateNumberRange(WINNING_NUMBER)).toThrowError('1 ~ 45 사이의 숫자를 입력해주세요')
  })

  it('winning numbers should be unique', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 5]
    const BONUS_NUMBER = 5

    //then
    expect(() => validateBonusNumberUnique(WINNING_NUMBER, BONUS_NUMBER)).toThrowError('중복된 숫자가 있습니다.')
  })
})

describe('util functions test', () => {

  test('duplicationChecker', () => {
    //given
    const ARRAY = [1, 2, 3, 4, 5, 5]

    //then
    expect(duplicationChecker(ARRAY)).not.tobeTruthy()
  })

  test('profitRateCalculator', () => {
    //given
    const MONEY = 1000
    const TOTAL = 2000

    //then
    expect(profitRateCalculator(MONEY, TOTAL)).toBe(200)
  })

  test('arraySorter', () => {
    //given
    const ARRAY = [1, 4, 3, 2, 6, 5]

    //then
    expect(arraySorter(ARRAY)).toEqual([1, 2, 3, 4, 5, 6])
  })

})