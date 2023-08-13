import { ERROR } from '../domain/constants/index.js'
import { validateBonusDuplicate, validateNumber, validateNumberDuplicate, validateNumberRange, validatePositiveNumber, validatePrice, validateWinningNumberCount } from '../domain/validator.js'
import { arraySorter, profitRateCalculator } from '../util/index.js'

describe(`Validating Lotto purchase test`, () => {

  it('should be a Number', () => {
    //given
    const MONEY = 'heelo'

    //then
    expect(() => validateNumber(MONEY)).toThrowError(ERROR.NOT_NUMBER)
  })
  it('should be a greater than price of lotto', () => {
    //given
    const MONEY = 900

    //then
    expect(() => validatePrice(MONEY)).toThrowError(ERROR.NOT_ENOUGH_PRICE)
  })
  it('should be a positive number', () => {
    //given
    const MONEY = 2000.20

    //then
    expect(() => validatePositiveNumber(MONEY)).toThrowError(ERROR.NOT_POSITIVE_NUMBER)
  })

})

describe(`winning number test`, () => {
  it('should be a 6 numbers', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5]

    //then
    expect(() => validateWinningNumberCount(WINNING_NUMBER)).toThrowError(ERROR.NOT_ENOUGH_WINNING_NUMBER)
  })

  it('winning numbers should be 1 ~ 45', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 46]

    //then
    expect(() => validateNumberRange(WINNING_NUMBER)).toThrowError(ERROR.NOT_IN_RANGE)
  })

  it('winning numbers should be unique', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 5]

    //then
    expect(() => validateNumberDuplicate(WINNING_NUMBER)).toThrowError(ERROR.NOT_NUMBER_UNIQUE)
  })
})

describe(`bonus number test`, () => {
  it('should be a 1 number', () => {
    //given
    const WINNING_NUMBER = [1, 2]

    //then
    expect(() => validateBonusNumberCount(WINNING_NUMBER)).toThrowError(ERROR.NOT_ENOUGH_BONUS_NUMBER)
  })

  it('winning numbers should be 1 ~ 45', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 46]

    //then
    expect(() => validateNumberRange(WINNING_NUMBER)).toThrowError(ERROR.NOT_IN_RANGE)
  })

  it('winning numbers should be unique', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 5]
    const BONUS_NUMBER = 5

    //then
    expect(() => validateBonusDuplicate(WINNING_NUMBER, BONUS_NUMBER)).toThrowError(ERROR.NOT_BONUS_NUMBER_UNIQUE)
  })
})

describe('util functions test', () => {

  test('duplicationChecker', () => {
    //given
    const ARRAY = [1, 2, 3, 4, 5, 5]

    //then
    expect(() => validateNumberDuplicate(ARRAY)).toThrowError(ERROR.NOT_NUMBER_UNIQUE)
  })

  test('profitRateCalculator', () => {
    //given
    const MONEY = 1000
    const TOTAL = 2000

    //then
    expect(profitRateCalculator(MONEY, TOTAL)).toBe(100)
    // console.log(profitRateCalculator(MONEY, TOTAL))
  })

  test('arraySorter', () => {
    //given
    const ARRAY = [1,2,3,4,5,6];

    //then
    expect(arraySorter(ARRAY)).toStrictEqual([1, 2, 3, 4, 5, 6])
  })

})