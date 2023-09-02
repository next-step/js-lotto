import {
  convertStringToNumber,
  convertToNumberArray,
} from '../src/js/utils/format.js'
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
  describe('.isPositiveNumber(number)', () => {
    test.each([100, 22, 444, 1000, 2000, 3000, '1'])(
      '%s to be true',
      (value) => {
        expect(validate.isPositiveNumber(value)).toBe(true)
      },
    )

    test.each([{}, null, undefined, [], 0, -1, '0', '', true, false, 'abc'])(
      '%s to be false',
      (value) => {
        expect(validate.isPositiveNumber(value)).toBe(false)
      },
    )
  })

  describe('.length(target, requiredLength)', () => {
    test('to be true', () => {
      const numbers = [1, 2, 3, 4, 5, 6]
      expect(validate.length(numbers, 6)).toBe(true)
    })

    test.each([
      {},
      null,
      undefined,
      [],
      0,
      -1,
      '0',
      '',
      true,
      false,
      'abc',
      [1, 2, 3, 4, 5],
    ])('%s to be false', (value) => {
      expect(validate.length(value, 6)).toBe(false)
    })
  })
  describe('.isDuplicated(target)', () => {
    test.each([[['', '', '']], [[45, 45, 45]], [[1, 2, 3, 4, 5, 5]]])(
      '%s to be true',
      (value) => {
        expect(validate.isDuplicated(value)).toBe(true)
      },
    )

    test('to be false', () => {
      const numbers = [1, 2, 3, 4, 5, 6]
      expect(validate.isDuplicated(numbers)).toBe(false)
    })
  })
  describe('.numberRange(target, condition)', () => {
    // 배열일 경우
    test.each([[[1, 2, 3, 4, 5]], [[3, 8, 20, 30, 43, 44]]])(
      '%s to be true',
      (value) => {
        expect(validate.numberRange(value, { min: 1, max: 45 })).toBe(true)
      },
    )
    test.each([[46, 47, 48, 49], ['1', '2', '3', '4'], [], null, undefined])(
      '%s to be false',
      (value) => {
        expect(validate.numberRange(value, { min: 1, max: 45 })).toBe(false)
      },
    )

    // 단일 숫자일 경우
    test.each([1, 2, 3, 4, 5, 45])('%s to be true', (value) => {
      expect(validate.numberRange(value, { min: 1, max: 45 })).toBe(true)
    })
    test.each([46, -1, '45'])('%s to be false', (value) => {
      expect(validate.numberRange(value, { min: 1, max: 45 })).toBe(false)
    })
  })
})

describe('convertToNumberArray(input)', () => {
  test.each([
    ['1', '2', '3'],
    ['34', '55', '68'],
    '12,13,15,18,20',
    '-1,-2,-3',
  ])('%s to be true', (value) => {
    expect(convertToNumberArray(value).every(Number.isFinite)).toBe(true)
  })

  test.each([['a', 'b', 'c'], 'a,b,c,d', [null, {}, undefined, []]])(
    '%s to be false',
    (value) => {
      expect(convertToNumberArray(value).every(Number.isFinite)).toBe(false)
    },
  )
})

describe('convertStringToNumber', () => {
  test.each([
    ['1', 1],
    ['2', 2],
    ['555', 555],
    ['-1', -1],
  ])('%s => %s', (value) => {
    expect(convertStringToNumber(value) == Number(value)).toBe(true)
  })
})

describe('createLottoNumberObject', () => {})
