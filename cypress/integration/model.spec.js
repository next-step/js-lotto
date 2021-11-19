// @ts-nocheck
import model from '../../dist/model.js'
import { ErrorMsgs } from '../../dist/constants.js'

describe('lotto model unit test', () => {
  describe('isValid', () => {
    it('[5, 10, 20, 30, 40, 45, 24] => 정상', () => {
      expect(model.isValid([5, 10, 20, 30, 40, 45, 24], 7)).to.be.true
    })
    it('[55, 10, 20, 30, 40, 45, 24] => 에러(55 범위 초과)', () => {
      expect(model.isValid.bind(model, [55, 10, 20, 30, 40, 45, 24], 7)).to.throw(ErrorMsgs.OUT_OF_RANGE)
    })
    it('[20, 10, 20, 30, 40, 45, 24] => 에러(20 중복)', () => {
      expect(model.isValid.bind(model, [20, 10, 20, 30, 40, 45, 24], 7)).to.throw(ErrorMsgs.DUPLICATED)
    })
  })

  describe('setPrice', () => {
    it('setPrice(500) => throw Error(MIN_PRICE)', () => {
      expect(model.setPrice.bind(model, 500)).to.throw(ErrorMsgs.MIN_PRICE)
    })
    it('setPrice(1500) => 1', () => {
      expect(model.setPrice(1500)).to.eq(1)
    })
    it('setPrice(4321) => 4', () => {
      expect(model.setPrice(4321)).to.eq(4)
    })
  })

  describe('setEntry', () => {
    it('setEntry(0, [1, 2, 3, 4, 5, 6]) => [1, 2, 3, 4, 5, 6]', () => {
      expect(model.setEntry(0, [1, 2, 3, 4, 5, 6])).to.deep.equal([1, 2, 3, 4, 5, 6])
    })
    it('setEntry(0, [0, 0, 0, 0, 0, 0], true) => 랜덤생성', () => {
      expect(model.setEntry(0, [0, 0, 0, 0, 0, 0], true)).to.be.a('array')
    })
  })

  describe('setAllLottoRandom', () => {
    it('입력값이 3500이면 3개의 랜덤 로또 생성', () => {
      expect(model.setAllLottoRandom(3500)).to.have.lengthOf(3)
    })
    it('입력값이 4200이면 4개의 랜덤 로또 생성', () => {
      expect(model.setAllLottoRandom(4200)).to.have.lengthOf(4)
    })
    it('입력값이 500이면 에러', () => {
      expect(model.setAllLottoRandom.bind(model, 500)).to.throw(ErrorMsgs.MIN_PRICE)
    })
  })

  describe('getWinList - 사용자 입력값이 [[1, 2, 3, 4, 5, 6]]일 때', () => {
    const matchKeys = ['g5', 'g4', 'g3', 'g2', 'g1']
    beforeEach(() => {
      model.setPrice(1000)
      model.setEntry(0, [1, 2, 3, 4, 5, 6])
    })
    it('당첨번호 [1, 2, 7, 8, 9, 10, 11] => 2개 일치 => 당첨X / -100%', () => {
      const { winningList, earningRate } = model.getWinList([1, 2, 7, 8, 9, 10, 11])
      matchKeys.forEach(key => {
        expect(winningList[key]).to.eq(0)
      })
      expect(earningRate).to.eq(-100)
    })
    it('당첨번호 [1, 2, 3, 8, 9, 10, 11] => 3개 일치 => 5등 / 400%', () => {
      const { winningList, earningRate } = model.getWinList([1, 2, 3, 8, 9, 10, 11])
      matchKeys.forEach(key => {
        if (key === 'g5') expect(winningList[key]).to.eq(1)
        else expect(winningList[key]).to.eq(0)
      })
      expect(earningRate).to.eq(400)
    })
    it('당첨번호 [1, 2, 3, 4, 9, 10, 11] => 4개 일치 => 4등 / 4900%', () => {
      const { winningList, earningRate } = model.getWinList([1, 2, 3, 4, 9, 10, 11])
      matchKeys.forEach(key => {
        if (key === 'g4') expect(winningList[key]).to.eq(1)
        else expect(winningList[key]).to.eq(0)
      })
      expect(earningRate).to.eq(4_900)
    })
    it('당첨번호 [1, 2, 3, 4, 5, 10, 11] => 5개 일치 => 3등 / 149900%', () => {
      const { winningList, earningRate } = model.getWinList([1, 2, 3, 4, 5, 10, 11])
      matchKeys.forEach(key => {
        if (key === 'g3') expect(winningList[key]).to.eq(1)
        else expect(winningList[key]).to.eq(0)
      })
      expect(earningRate).to.eq(149_900)
    })
    it('당첨번호 [1, 2, 3, 4, 5, 10, 6] => 5개 일치 + 보너스 => 2등 / 2999900%', () => {
      const { winningList, earningRate } = model.getWinList([1, 2, 3, 4, 5, 10, 6])
      matchKeys.forEach(key => {
        if (key === 'g2') expect(winningList[key]).to.eq(1)
        else expect(winningList[key]).to.eq(0)
      })
      expect(earningRate).to.eq(2_999_900)
    })
    it('당첨번호 [1, 2, 3, 4, 5, 6, 11] => 6개 일치 => 1등 / 199999900%', () => {
      const { winningList, earningRate } = model.getWinList([1, 2, 3, 4, 5, 6, 11])
      matchKeys.forEach(key => {
        if (key === 'g1') expect(winningList[key]).to.eq(1)
        else expect(winningList[key]).to.eq(0)
      })
      expect(earningRate).to.eq(199_999_900)
    })
  })
})
