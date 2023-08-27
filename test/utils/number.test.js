import { generateRandomNumber } from '../../src/js/utils/number'

describe('utils/number', () => {
  describe('generateRandomNumber()', () => {
    it('최대 숫자인 10을 인자로 받고 10 미만의 난수를 생성할 수 있다.', () => {
      // Given
      jest.spyOn(Math, 'random').mockReturnValueOnce(0.84422355)

      // When
      const result = generateRandomNumber(10)

      // Then
      expect(result).toBe(8)
    })

    it('최대 숫자인 100을 인자로 받고 100 미만의 난수를 생성할 수 있다.', () => {
      // Given
      jest.spyOn(Math, 'random').mockReturnValueOnce(0.84422355)

      // When
      const result = generateRandomNumber(100)

      // Then
      expect(result).toBe(84)
    })

    it('최대 숫자인 1000을 인자로 받고 1000 미만의 난수를 생성할 수 있다.', () => {
      // Given
      jest.spyOn(Math, 'random').mockReturnValueOnce(0.84422355)

      // When
      const result = generateRandomNumber(1000)

      // Then
      expect(result).toBe(844)
    })
  })
})
