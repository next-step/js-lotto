import {
  getCountOfPurchase,
  generateLotto,
  getMatchCount,
  hasBonusMatch,
  getLottoScore,
  getLottoResult,
  calcTotalPrize,
  getReturnRate,
  getLottoStats,
  generateLottoList
} from '../../../src/js/services/lotto/lottoUtils'

describe('services/lottoUtils', () => {
  describe('getCountOfPurchase()', () => {
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

  describe('generateLottoList()', () => {
    it.each([[1], [2], [5], [10]])(
      '로또의 개수를 인자로 입력받고 해당 개수만큼 로또를 생성해서 반환한다.',
      count => {
        // When
        const lottoList = generateLottoList(count)

        // Then
        expect(lottoList.length).toBe(count)
      }
    )
  })

  describe('getMatchCount()', () => {
    it('당첨 번호들과 로또 번호들을 인자로 받고 일치하는 번호가 없는 경우, 0을 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [7, 8, 9, 10, 11, 12]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(0)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 1개 일치하는 경우, 1을 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 8, 9, 10, 11, 12]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(1)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 2개 일치하는 경우, 2를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 8, 9, 3, 11, 12]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(2)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 3개 일치하는 경우, 3을 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 8, 9, 3, 11, 4]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(3)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 4개 일치하는 경우, 4를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 2, 9, 3, 11, 4]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(4)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 5개 일치하는 경우, 5를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const lotto = [6, 2, 4, 3, 11, 4]

      // When
      const result = getMatchCount(winNumberList, lotto)

      // Then
      expect(result).toBe(5)
    })

    it('당첨 번호들과 로또 번호들을 인자로 받고 모두 일치하는 경우, 6을 반환해야 한다.', () => {
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
    it('보너스 번호와 로또 번호들을 인자로 받고 로또 번호에 보너스 번호가 포함되어 있는 경우, true를 반환해야 한다.', () => {
      //Given
      const bonusNumber = 5
      const lotto = [1, 2, 3, 4, 5, 6]

      // When
      const result = hasBonusMatch(bonusNumber, lotto)

      // Then
      expect(result).toBe(true)
    })
    it('보너스 번호와 로또 번호들을 인자로 받고 로또 번호에 보너스 번호가 포함되어 있지 않은 경우, false를 반환해야 한다.', () => {
      //Given
      const bonusNumber = 8
      const lotto = [1, 2, 3, 4, 5, 6]

      // When
      const result = hasBonusMatch(bonusNumber, lotto)

      // Then
      expect(result).toBe(false)
    })
  })

  describe('getLottoScore()', () => {
    it('당첨 번호, 보너스 번호, 로또 번호들을 인자로 받고 6개 모두 일치한 경우, 문자열 6을 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 6]
      const bonusNumber = 7
      const lotto = [1, 2, 3, 4, 5, 6]

      // When
      const score = getLottoScore(winNumberList, bonusNumber, lotto)

      // Then
      expect(score).toBe('6')
    })

    it('당첨 번호, 보너스 번호, 로또 번호들을 인자로 받고 당첨 번호 5개와 보너스 번호가 일치한 경우, 문자열 5+를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 6
      const lotto = [1, 2, 3, 4, 5, 6]

      // When
      const score = getLottoScore(winNumberList, bonusNumber, lotto)

      // Then
      expect(score).toBe('5+')
    })

    it('당첨 번호, 보너스 번호, 로또 번호들을 인자로 받고 당첨 번호 5개가 일치한 경우, 문자열 5를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 8
      const lotto = [1, 2, 3, 4, 5, 6]

      // When
      const score = getLottoScore(winNumberList, bonusNumber, lotto)

      // Then
      expect(score).toBe('5')
    })

    it('당첨 번호, 보너스 번호, 로또 번호들을 인자로 받고 당첨 번호 4개가 일치한 경우, 문자열 4를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 8
      const lotto = [1, 2, 3, 4, 9, 10]

      // When
      const score = getLottoScore(winNumberList, bonusNumber, lotto)

      // Then
      expect(score).toBe('4')
    })

    it('당첨 번호, 보너스 번호, 로또 번호들을 인자로 받고 당첨 번호 3개가 일치한 경우, 문자열 3을 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 8
      const lotto = [1, 2, 3, 9, 10, 11]

      // When
      const score = getLottoScore(winNumberList, bonusNumber, lotto)

      // Then
      expect(score).toBe('3')
    })

    it('당첨 번호, 보너스 번호, 로또 번호들을 인자로 받고 당첨 번호가 2개 일치하는 경우, 문자열 2를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 8
      const lotto = [1, 2, 34, 9, 10, 8]

      // When
      const score = getLottoScore(winNumberList, bonusNumber, lotto)

      // Then
      expect(score).toBe('2')
    })

    it('당첨 번호, 보너스 번호, 로또 번호들을 인자로 받고 당첨 번호가 2개 일치하는 경우, 문자열 1을 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 8
      const lotto = [1, 20, 34, 9, 10, 8]

      // When
      const score = getLottoScore(winNumberList, bonusNumber, lotto)

      // Then
      expect(score).toBe('1')
    })

    it('당첨 번호, 보너스 번호, 로또 번호들을 인자로 받고 보너스 번호만 일치하는 경우, 문자열 0을 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 8
      const lotto = [11, 22, 34, 9, 10, 8]

      // When
      const score = getLottoScore(winNumberList, bonusNumber, lotto)

      // Then
      expect(score).toBe('0')
    })

    it('당첨 번호, 보너스 번호, 로또 번호들을 인자로 받고 당첨 번호가 모두 일치하지 않는 경우, 문자열 0을 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 8
      const lotto = [11, 22, 34, 9, 10, 19]

      // When
      const score = getLottoScore(winNumberList, bonusNumber, lotto)

      // Then
      expect(score).toBe('0')
    })
  })

  describe('getLottoResult()', () => {
    it('당첨 번호, 보너스 번호, 로또 배열을 인자로 받고 당첨 번호와 5개가 일치한 로또가 2개인 경우, 해당 score와 로또 개수를 나타내는 객체를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 6
      const lottoList = [
        [1, 2, 3, 4, 5, 8],
        [2, 3, 4, 5, 7, 8],
        [10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21]
      ]

      // When
      const result = getLottoResult(winNumberList, bonusNumber, lottoList)

      // Then
      expect(result).toEqual({ 5: 2 })
    })

    it('당첨 번호, 보너스 번호, 로또 배열을 인자로 받고 당첨 번호와 5개가 일치한 로또가 2개, 4개 일치한 로또가 1개인 경우, 해당 score와 로또 개수를 나타내는 객체를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 6
      const lottoList = [
        [1, 2, 3, 4, 5, 8],
        [2, 3, 4, 5, 7, 8],
        [2, 3, 4, 5, 8, 9],
        [10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21]
      ]

      // When
      const result = getLottoResult(winNumberList, bonusNumber, lottoList)

      // // Then
      expect(result).toEqual({ 5: 2, 4: 1 })
    })

    it('당첨 번호, 보너스 번호, 로또 배열을 인자로 받고 당첨 번호와 5개가 일치한 로또가 2개, 4개 일치한 로또가 1개, 3개 일치한 로또가 2개인 경우, 해당 score와 로또 개수를 나타내는 객체를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 6
      const lottoList = [
        [1, 2, 3, 4, 5, 8],
        [2, 3, 4, 5, 7, 8],
        [2, 3, 4, 5, 8, 9],
        [11, 21, 3, 4, 5, 8],
        [12, 22, 3, 4, 5, 8],
        [10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21]
      ]

      // When
      const result = getLottoResult(winNumberList, bonusNumber, lottoList)

      // Then
      expect(result).toEqual({ 5: 2, 4: 1, 3: 2 })
    })

    it('당첨 번호, 보너스 번호, 로또 배열을 인자로 받고 당첨 번호와 로또가 모두 일치하지 않는 경우, 빈 객체를 반환해야 한다.', () => {
      // Given
      const winNumberList = [1, 2, 3, 4, 5, 7]
      const bonusNumber = 6
      const lottoList = [
        [12, 23, 34, 44, 15, 18],
        [22, 43, 14, 15, 17, 28],
        [23, 33, 24, 15, 18, 29],
        [11, 21, 34, 43, 52, 38],
        [12, 22, 33, 34, 35, 38],
        [10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21]
      ]

      // When
      const result = getLottoResult(winNumberList, bonusNumber, lottoList)

      // Then
      expect(result).toEqual({})
    })
  })

  describe('calcTotalPrize()', () => {
    it('5개가 일치한 로또 2개가 있는 당첨 결과를 인자로 받고 총 당첨금인 3000000을 반환해야 한다.', () => {
      // Given
      const result = { 5: 2 }

      // When
      const prize = calcTotalPrize(result)

      // Then
      expect(prize).toBe(3000000)
    })

    it('6개가 일치한 로또 1개가 있는 당첨 결과를 인자로 받고 총 당첨금인 2000000000을 반환해야 한다.', () => {
      // Given
      const result = { 6: 1 }

      // When
      const prize = calcTotalPrize(result)

      // Then
      expect(prize).toBe(2000000000)
    })

    it('3개가 일치한 로또 2개, 4개가 일치한 로또 3개가 있는 당첨 결과를 인자로 받고 총 당첨금인 2000000000을 반환해야 한다.', () => {
      // Given
      const result = { 4: 3, 3: 2 }

      // When
      const prize = calcTotalPrize(result)

      // Then
      expect(prize).toBe(160000)
    })
  })

  describe('getReturnRate()', () => {
    it('투자 금액과 상금을 인자로 받고 수익률인 400을 반환해야 한다.', () => {
      // Given
      const totalPrize = 10000
      const payment = 2500

      // When
      const returnRate = getReturnRate(totalPrize, payment)

      // Then
      expect(returnRate).toBe('400.0')
    })

    it('투자 금액과 상금을 인자로 받고 수익률인 4000을 반환해야 한다.', () => {
      // Given
      const totalPrize = 100000
      const payment = 2500

      // When
      const returnRate = getReturnRate(totalPrize, payment)

      // Then
      expect(returnRate).toBe('4000.0')
    })

    it('투자 금액과 상금을 인자로 받고 수익률인 5000을 반환해야 한다.', () => {
      // Given
      const totalPrize = 100000
      const payment = 2000

      // When
      const returnRate = getReturnRate(totalPrize, payment)

      // Then
      expect(returnRate).toBe('5000.0')
    })
  })

  describe('getLottoStats()', () => {
    it('6개가 일치한 로또 1개가 있는 당첨 결과를 인자로 받고 당첨 통계가 담긴 배열을 반환해야 한다.', () => {
      // Given
      const result = { 6: 1 }

      // When
      const stats = getLottoStats(result)

      // Then
      expect(stats).toEqual([
        '3개 일치 (5,000원) - 0개',
        '4개 일치 (50,000원) - 0개',
        '5개 일치 (1,500,000원) - 0개',
        '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
        '6개 일치 (2,000,000,000원) - 1개'
      ])
    })

    it('3개가 일치한 로또 3개, 4개가 일치한 로또 4개, 5개가 일치한 로또 1개가 있는 당첨 결과를 인자로 받고 당첨 통계가 담긴 배열을 반환해야 한다.', () => {
      // Given
      const result = { 3: 3, 4: 4, 5: 1 }

      // When
      const stats = getLottoStats(result)

      // Then
      expect(stats).toEqual([
        '3개 일치 (5,000원) - 3개',
        '4개 일치 (50,000원) - 4개',
        '5개 일치 (1,500,000원) - 1개',
        '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
        '6개 일치 (2,000,000,000원) - 0개'
      ])
    })

    it('3개가 일치한 로또 3개, 5개와 보너스 번호가 일치한 로또 1개가 있는 당첨 결과를 인자로 받고 당첨 통계가 담긴 배열을 반환해야 한다.', () => {
      // Given
      const result = { 3: 3, '5+': 1 }

      // When
      const stats = getLottoStats(result)

      // Then
      expect(stats).toEqual([
        '3개 일치 (5,000원) - 3개',
        '4개 일치 (50,000원) - 0개',
        '5개 일치 (1,500,000원) - 0개',
        '5개 일치, 보너스 볼 일치 (30,000,000원) - 1개',
        '6개 일치 (2,000,000,000원) - 0개'
      ])
    })
  })
})
