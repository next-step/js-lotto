// @ts-nocheck
import model from '../../dist/model.js'
import { ErrorMsgs, UNIT_PRICE } from '../../dist/constants.js'

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
    it(`setPrice(${UNIT_PRICE * 0.5}) => throw Error(MIN_PRICE)`, () => {
      expect(model.setPrice.bind(model, UNIT_PRICE * 0.5)).to.throw(ErrorMsgs.MIN_PRICE)
    })
    it(`setPrice(${UNIT_PRICE * 1.5}) => 1`, () => {
      expect(model.setPrice(UNIT_PRICE * 1.5)).to.eq(1)
    })
    it(`setPrice(${UNIT_PRICE * 4.321}) => 4`, () => {
      expect(model.setPrice(UNIT_PRICE * 4.321)).to.eq(4)
    })
  })

  describe('generateRandomEntry', () => {
    it('0이 들어간 위치에만 랜덤을 지정한다.', () => {
      const res = model.generateRandomEntry([1, 2, 0, 3, 0, 4])
      expect(res[0]).to.eq(1)
      expect(res[1]).to.eq(2)
      expect(res[2]).to.be.within(5, 45)
      expect(res[3]).to.eq(3)
      expect(res[4]).to.be.within(5, 45)
      expect(res[5]).to.eq(4)
      expect(new Set(res).size).to.eq(res.length)
    })
  })

  describe('isEntriesAllRandom', () => {
    it('toggleRandomEntry - 항목별 랜덤체크에 대한 전체랜덤여부 테스트', () => {
      model.setPrice(3 * UNIT_PRICE)
      model.toggleRandomEntry(0, true)
      expect(model.isEntriesAllRandom).to.be.false
      model.toggleRandomEntry(1, true)
      expect(model.isEntriesAllRandom).to.be.false
      model.toggleRandomEntry(2, true)
      expect(model.isEntriesAllRandom).to.be.true
      model.toggleRandomEntry(1, false)
      expect(model.isEntriesAllRandom).to.be.false
    })
    it('toggleRandomEntries - 전체랜덤토글에 의한 전체랜덤여부 테스트', () => {
      model.setPrice(3 * UNIT_PRICE)
      model.toggleRandomEntries(true)
      expect(model.isEntriesAllRandom).to.be.true
      model.toggleRandomEntries(false)
      expect(model.isEntriesAllRandom).to.be.false
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
