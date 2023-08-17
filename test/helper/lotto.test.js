import {
  getCountOfPurchase,
  generateLotto,
  getMatchCount,
  hasBonusMatch
} from '../../src/js/helper/lotto'

describe('helper - lotto', () => {
  describe('getCountOfPurchase', () => {
    it('구입 금액이 1000원인 경우, 10000을 입력하면 구매 가능한 개수인 10으로 반환해야 한다.', () => {
      // Given
      const amount = 10000
      const price = 1000

      // When
      const result = getCountOfPurchase(amount, price)

      // Then
      expect(result).toBe(10)
    })

    it('구입 금액이 10000원인 경우, 10000을 입력하면 구매 가능한 개수인 1으로 반환해야 한다.', () => {
      // Given
      const amount = 10000
      const price = 10000

      // When
      const result = getCountOfPurchase(amount, price)

      // Then
      expect(result).toBe(1)
    })

    it('구입 금액이 800원인 경우, 10000을 입력하면 구매 가능한 개수인 12로 반환해야 한다.', () => {
      // Given
      const amount = 10000
      const price = 800

      // When
      const result = getCountOfPurchase(amount, price)

      // Then
      expect(result).toBe(12)
    })

    it('구입 금액이 10000원인 경우, 1000을 입력하면 구매 가능한 개수가 없으므로 0을 반환해야 한다.', () => {
      // Given
      const amount = 1000
      const price = 10000

      // When
      const result = getCountOfPurchase(amount, price)

      // Then
      expect(result).toBe(0)
    })
  })

  describe('generateLotto()', () => {
    it('6개의 중복없는 난수를 생성할 수 있다.', () => {
      // Given, When
      const result = generateLotto()
      const uniqueArray = new Set(result)

      // Then
      expect(result.length).toBe(6)
      expect(uniqueArray.size).toBe(6)
    })
  })

  describe('getMatchCount()', () => {
    it('당첨 번호들과 로또 번호들을 인자로 받고 일치하는 번호가 없는 경우, 0을 반환한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [7, 8, 9, 10, 11, 12]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(0)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 1개 일치하는 경우, 1을 반환한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 8, 9, 10, 11, 12]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(1)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 2개 일치하는 경우, 2를 반환한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 8, 9, 3, 11, 12]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(2)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 3개 일치하는 경우, 3을 반환한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 8, 9, 3, 11, 4]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(3)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 4개 일치하는 경우, 4를 반환한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 2, 9, 3, 11, 4]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(4)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 5개 일치하는 경우, 5를 반환한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 2, 4, 3, 11, 4]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(5)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 모두 일치하는 경우, 6을 반환한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 2, 4, 3, 1, 4]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(6)
    })
  })

  describe('hasBonusMatch()', () => {
    it('보너스 번호와 로또 번호들을 인자로 받고 로또 번호에 보너스 번호가 포함되어 있는 경우, true를 반환한다.', () => {
      //Given
      const bonusNumber = 5
      const lotto = [1, 2, 3, 4, 5, 6]

      // When
      const result = hasBonusMatch(bonusNumber, lotto)

      // Then
      expect(result).toBe(true)
    })
    it('보너스 번호와 로또 번호들을 인자로 받고 로또 번호에 보너스 번호가 포함되어 있지 않은 경우, false를 반환한다.', () => {
      //Given
      const bonusNumber = 8
      const lotto = [1, 2, 3, 4, 5, 6]

      // When
      const result = hasBonusMatch(bonusNumber, lotto)

      // Then
      expect(result).toBe(false)
    })
  })
})
