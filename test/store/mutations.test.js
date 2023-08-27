import { state as getState } from '../../src/js/store/state'
import { mutations } from '../../src/js/store/mutations'

describe('store/mutations', () => {
  describe('addLotto()', () => {
    it('state의 lottoList에 lotto를 추가할 수 있다.', () => {
      // Given
      const state = { lottoList: [] }
      const lotto = [1, 2, 3, 4, 5, 6]

      // When
      mutations.addLotto(state, { lotto })

      // Then
      expect(state.lottoList).toEqual([lotto])
    })
  })

  describe('setCount()', () => {
    it('state의 count를 변경할 수 있다.', () => {
      // Given
      const state = { count: 0 }
      const count = 5

      // When
      mutations.setCount(state, { count })

      // Then
      expect(state.count).toEqual(count)
    })
  })

  describe('setWinNumberList()', () => {
    it('state의 winNumberList를 변경할 수 있다.', () => {
      // Given
      const state = { winNumberList: [] }
      const winNumberList = [1, 2, 3, 4, 5, 6]

      // When
      mutations.setWinNumberList(state, { winNumberList })

      // Then
      expect(state.winNumberList).toEqual(winNumberList)
    })
  })

  describe('setBonusNumber()', () => {
    it('state의 bonusNumber를 변경할 수 있다.', () => {
      // Given
      const state = { bonusNumber: 0 }
      const bonusNumber = 6

      // When
      mutations.setBonusNumber(state, { bonusNumber })

      // Then
      expect(state.bonusNumber).toEqual(bonusNumber)
    })
  })

  describe('setLottoResult()', () => {
    it('state의 lottoResult를 변경할 수 있다.', () => {
      // Given
      const state = { lottoResult: { rate: null, stats: [] } }
      const lottoResult = { rate: '100', stats: ['stat1'] }

      // When
      mutations.setLottoResult(state, { lottoResult })

      // Then
      expect(state.lottoResult).toEqual(lottoResult)
    })
  })

  describe('reset()', () => {
    it('state를 lotto 기본값으로 초기화할 수 있다.', () => {
      // Given
      const state = {
        count: 10,
        lottoList: [1],
        winNumberList: [1, 2],
        bonusNumber: 8,
        lottoResult: {
          rate: '111',
          stats: []
        }
      }

      // When
      mutations.reset(state)

      // Then
      expect(state).toEqual(getState())
    })
  })
})
