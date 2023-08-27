import { actions } from '../../src/js/store/actions'
import { LOTTO_MUTATIONS_TYPE } from '../../src/js/constants/store'
import * as lottoUtils from '../../src/js/services/lotto/lottoUtils'

describe('store/actions', () => {
  let onSuccess
  let onError

  beforeEach(() => {
    onSuccess = jest.fn()
    onError = jest.fn()
  })

  describe('updatePayment()', () => {
    it('구입 금액이 유효한 값인 경우, setCount commit과 addLotto commit을 실행하고 onSuccess를 실행한다.', () => {
      // Given
      const commit = jest.fn()
      const paymentText = '2000'
      const mockLotto = [1, 2, 3, 4, 5, 6]
      jest
        .spyOn(lottoUtils, 'generateLottoList')
        .mockImplementationOnce(() => [mockLotto, mockLotto])

      // When
      actions.updatePayment({ commit }, { paymentText, onSuccess, onError })

      // Then
      expect(commit).toHaveBeenNthCalledWith(
        1,
        LOTTO_MUTATIONS_TYPE.SET_COUNT,
        { count: 2 }
      )
      expect(commit).toHaveBeenNthCalledWith(
        2,
        LOTTO_MUTATIONS_TYPE.ADD_LOTTO,
        {
          lotto: mockLotto
        }
      )
      expect(commit).toHaveBeenNthCalledWith(
        3,
        LOTTO_MUTATIONS_TYPE.ADD_LOTTO,
        {
          lotto: mockLotto
        }
      )

      expect(onSuccess).toBeCalled()
      expect(onError).not.toBeCalled()
    })

    it('구입 금액이 유효하지 않은 값인 경우, onError를 실행한다.', () => {
      // Given
      const commit = jest.fn()
      const paymentText = '800'

      // When
      actions.updatePayment({ commit }, { paymentText, onSuccess, onError })

      // Then
      expect(commit).not.toBeCalled()
      expect(onSuccess).not.toBeCalled()
      expect(onError).toBeCalled()
    })
  })

  describe('updateWinNumber()', () => {
    it('당첨번호가 유효한 값인 경우, setWinNumberList commit을 실행하고 onSuccess를 실행한다.', () => {
      // Given
      const commit = jest.fn()
      const winNumberText = '1,2,3,4,5,6'

      // When
      actions.updateWinNumber({ commit }, { winNumberText, onSuccess, onError })

      // Then
      expect(commit).toBeCalledWith(LOTTO_MUTATIONS_TYPE.SET_WIN_NUMBER_LIST, {
        winNumberList: [1, 2, 3, 4, 5, 6]
      })
      expect(onSuccess).toBeCalled()
      expect(onError).not.toBeCalled()
    })

    it('당첨번호가 유효하지 않은 값인 경우, onError를 실행한다.', () => {
      // Given
      const commit = jest.fn()
      const winNumberText = '1,2,2,4,5,6'

      // When
      actions.updateWinNumber({ commit }, { winNumberText, onSuccess, onError })

      // Then
      expect(commit).not.toBeCalled()
      expect(onSuccess).not.toBeCalled()
      expect(onError).toBeCalled()
    })
  })

  describe('updateBonusNumber()', () => {
    it('보너스 번호가 유효한 값인 경우, setBonusNumber commit과 setLottoResult commit을 실행하고 onSuccess를 실행한다.', () => {
      // Given
      const commit = jest.fn()
      const state = {
        winNumberList: [1, 2, 3, 4, 5, 6],
        lottoList: [[1, 2, 3, 4, 5, 6]]
      }
      const bonusNumberText = '7'

      // When
      actions.updateBonusNumber(
        { commit, state },
        { bonusNumberText, onSuccess, onError }
      )

      // Then
      expect(commit).toHaveBeenNthCalledWith(
        1,
        LOTTO_MUTATIONS_TYPE.SET_BONUS_NUMBER,
        { bonusNumber: 7 }
      )
      expect(commit).toHaveBeenNthCalledWith(
        2,
        LOTTO_MUTATIONS_TYPE.SET_LOTTO_RESULT,
        {
          lottoResult: {
            rate: '200000000.0',
            stats: [
              '3개 일치 (5,000원) - 0개',
              '4개 일치 (50,000원) - 0개',
              '5개 일치 (1,500,000원) - 0개',
              '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
              '6개 일치 (2,000,000,000원) - 1개'
            ]
          }
        }
      )
      expect(onSuccess).toBeCalled()
      expect(onError).not.toBeCalled()
    })

    it('보너스 번호가 유효하지 않은 값인 경우, onError를 실행한다.', () => {
      // Given
      const commit = jest.fn()
      const state = {
        winNumberList: [1, 2, 3, 4, 5, 6],
        lottoList: [[1, 2, 3, 4, 5, 6]]
      }
      const bonusNumberText = '6'

      // When
      actions.updateBonusNumber(
        { commit, state },
        { bonusNumberText, onSuccess, onError }
      )

      // Then
      expect(commit).not.toBeCalled()
      expect(onSuccess).not.toBeCalled()
      expect(onError).toBeCalled()
    })
  })

  describe('updateRetry()', () => {
    it('retry 응답이 y인 경우, rest commit과 onSuccess를 실행한다.', () => {
      // Given
      const commit = jest.fn()
      const onClose = jest.fn()
      const answer = 'y'

      // When
      actions.updateRetry({ commit }, { answer, onSuccess, onClose })

      // Then
      expect(commit).toBeCalledWith(LOTTO_MUTATIONS_TYPE.RESET)
      expect(onSuccess).toBeCalled()
      expect(onClose).not.toBeCalled()
    })

    it('retry 응답이 y가 아닌 경우, onClose를 실행한다.', () => {
      // Given
      const commit = jest.fn()
      const onClose = jest.fn()
      const answer = 'n'

      // When
      actions.updateRetry({ commit }, { answer, onSuccess, onClose })

      // Then
      expect(commit).not.toBeCalled()
      expect(onSuccess).not.toBeCalled()
      expect(onClose).toBeCalled()
    })
  })
})
