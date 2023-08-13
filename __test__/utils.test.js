import { generateLottoNumbers } from '../src/js/utils/generateLottoNumbers.js'
import { validate } from '../src/js/utils/validate.js'

describe('generateLottoNumbers()', () => {
  test.each([1, 2, 3, 4, 5])(
    '카운트가 일치해야 한다. generateLottoNumbers(%s)',
    (count) => {
      // When
      const lottoNumbers = generateLottoNumbers(count)

      // Then
      expect(lottoNumbers.length).toBe(count)
    },
  )

  test.each([5, 6, 7, 8, 9, 10, 20])(
    '중복되는 숫자가 없어야 한다. generateLottoNumbers(%s)',
    (count) => {
      // When
      const lottoNumbers = generateLottoNumbers(count)
      const lottoNumbersSet = new Set(lottoNumbers)

      // Then
      expect(lottoNumbersSet.size === lottoNumbers.length).toBe(true)
    },
  )
})

describe('validate', () => {
  describe('.isValidPositiveNumber(number)', () => {
    test.each([100, 22, 444, 1000, 2000, 3000, '1'])(
      '%s to be true',
      (value) => {
        expect(validate.isValidPositiveNumber(value)).toBe(true)
      },
    )

    test.each([{}, null, undefined, [], 0, -1, '0', '', true, false, 'abc'])(
      '%s to be false',
      (value) => {
        expect(validate.isValidPositiveNumber(value)).toBe(false)
      },
    )
  })
})
