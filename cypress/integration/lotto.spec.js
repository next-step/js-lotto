// @ts-nocheck
import { ErrorMsgs, UNIT_PRICE } from '../../dist/constants.js'
before(() => {
  cy.visit('http://localhost:3000/')
})

describe('lotto step-1', () => {
  it('초기에는 입력창만 보여지고 포커스되어 있어야 함', () => {
    cy.get('form-details').should('not.be.visible')
    cy.get('form-winning').should('not.be.visible')
    cy.get('form-price input').should('be.focused')
  })
  describe('입력값에 따른 에러', () => {
    it('금액 입력하지 않고 버튼 클릭시 에러', () => {
      cy.get('form-price form').submit()
      cy.on('window.alert', text => expect(text).to.be(ErrorMsgs.MIN_PRICE))
    })
    it(`${UNIT_PRICE}원 이하 입력시 에러`, () => {
      cy.inputPrice(UNIT_PRICE / 2)
      cy.on('window.alert', text => expect(text).to.be(ErrorMsgs.MIN_PRICE))
    })
  })
  describe('입력값에 따른 정상동작', () => {
    it(`${UNIT_PRICE}원 초과 입력시 구매한 로또 수량 및 아이콘 표시`, () => {
      cy.inputPrice(UNIT_PRICE * 3)
      cy.get('form-details').should('be.visible')
      cy.get('form-winning').should('not.be.visible')
      cy.detailEntries().should('have.length', 3)
      cy.get('form-details .label-amount').contains(3)
    })
    it('단위금액 이하는 버림한다.', () => {
      cy.inputPrice(UNIT_PRICE * 7.7)
      cy.detailEntries().should('have.length', 7)
      cy.get('form-details .label-amount').contains(7)
    })
  })
})

describe('lotto-step-3', () => {
  describe('입력값 및 random checkbox, disabled 테스트', () => {
    it('전부 전체 수동입력 ([1, 2, 3, 4, 5, 6], [3, 4, 5, 6, 7, 8])일 경우', () => {
      cy.inputPrice(UNIT_PRICE * 2)
      cy.detailEntriesToggleAll().should('not.be.checked')

      cy.fillDetailEntry(0, [1, 2, 3, 4, 5, 6])
      cy.fillDetailEntry(1, [3, 4, 5, 6, 7, 8])

      cy.detailEntriesToggleAll().should('not.be.checked')
      cy.getDetailEntryCheckbox(0).should('not.be.checked')
      cy.getDetailEntryCheckbox(1).should('not.be.checked')
      cy.detailEntryInputs(0).should('not.be.disabled')
      cy.detailEntryInputs(1).should('not.be.disabled')
    })

    it('일부는 전체 수동입력 ([1, 2, 3, 4, 5, 6]), 일부는 전체 자동일 경우', () => {
      cy.inputPrice(UNIT_PRICE * 2)
      cy.detailEntriesToggleAll().should('not.be.checked')

      cy.fillDetailEntry(0, [1, 2, 3, 4, 5, 6])
      cy.randomDetailEntry(1)

      cy.detailEntriesToggleAll().should('not.be.checked')
      cy.getDetailEntryCheckbox(0).should('not.be.checked')
      cy.getDetailEntryCheckbox(1).should('be.checked')
      cy.detailEntryInputs(0).should('not.be.disabled')
      cy.detailEntryInputs(1).should('be.disabled')
    })

    it('전부 반자동입력 ([1, 2, 3], [1, 2, 3, 4])일 경우', () => {
      cy.inputPrice(UNIT_PRICE * 2)
      cy.detailEntriesToggleAll().should('not.be.checked')

      cy.fillDetailEntry(0, [1, 2, 3])
      cy.fillDetailEntry(1, [1, 2, 3, 4])
      cy.randomDetailEntry(0)
      cy.randomDetailEntry(1)

      cy.detailEntriesToggleAll().should('be.checked')
      cy.getDetailEntryCheckbox(0).should('be.checked')
      cy.getDetailEntryCheckbox(1).should('be.checked')
      cy.detailEntryInputs(0).should('be.disabled')
      cy.detailEntryInputs(1).should('be.disabled')
    })

    it('-이어서- 두번째 항목 자동입력 해제시', () => {
      cy.toggleDetailEntry(1).uncheck()
      cy.detailEntriesToggleAll().should('not.be.checked')
      cy.getDetailEntryCheckbox(0).should('be.checked')
      cy.getDetailEntryCheckbox(1).should('not.be.checked')
      cy.detailEntryInputs(0).should('be.disabled')
      cy.detailEntryInputs(1).should('not.be.disabled')
    })

    it('-이어서- 첫번째 항목 자동입력 해제시', () => {
      cy.toggleDetailEntry(0).uncheck()
      cy.detailEntriesToggleAll().should('not.be.checked')
      cy.getDetailEntryCheckbox(0).should('not.be.checked')
      cy.getDetailEntryCheckbox(1).should('not.be.checked')
      cy.detailEntryInputs(0).should('not.be.disabled')
      cy.detailEntryInputs(1).should('not.be.disabled')
    })

    it('일부 수동입력([1, 2, 3]) 후 전체 자동 선택시', () => {
      cy.inputPrice(UNIT_PRICE * 2)
      cy.detailEntriesToggleAll().should('not.be.checked')

      cy.fillDetailEntry(0, [1, 2, 3])
      cy.detailEntriesToggleAll().check()

      cy.detailEntriesToggleAll().should('be.checked')
      cy.getDetailEntryCheckbox(0).should('be.checked')
      cy.getDetailEntryCheckbox(1).should('be.checked')
      cy.detailEntryInputs(0).should('be.disabled')
      cy.detailEntryInputs(1).should('be.disabled')
    })

    it('-이어서- 전체자동선택 해제시', () => {
      cy.detailEntriesToggleAll().uncheck()

      cy.detailEntriesToggleAll().should('not.be.checked')
      cy.getDetailEntryCheckbox(0).should('not.be.checked')
      cy.getDetailEntryCheckbox(1).should('not.be.checked')
      cy.detailEntryInputs(0).should('not.be.disabled')
      cy.detailEntryInputs(1).should('not.be.disabled')
    })
  })

  describe('입력값에 따른 결과 확인', () => {
    it('입력완료시 disabled되면서 랜덤생성된다.', () => {
      cy.inputPrice(UNIT_PRICE * 3)
      cy.fillDetailEntry(0, [1, 2, 3, 4, 5, 6])
      cy.fillDetailEntry(1, [7, 8, 9])
      cy.randomDetailEntry(1)
      cy.randomDetailEntry(2)
      cy.detailEntriesSubmit()

      cy.detailEntryInputs(0).should('be.disabled')
      cy.detailEntryInputs(1).should('be.disabled')
      cy.detailEntryInputs(2).should('be.disabled')
    })
  })
})

describe('lotto step-2', () => {
  it('당첨번호 중복 에러', () => {
    cy.fillWinningNumbers([1, 2, 3, 4, 5, 6, 6])
    cy.on('window.alert', text => expect(text).to.be(ErrorMsgs.DUPLICATED))
  })
  it('당첨번호 정상시 모달 노출', () => {
    cy.fillWinningNumbers(['1', '2', '3', '4', '{backspace}5', '{backspace}6', '{backspace}7'])
    cy.get('modal-stats').should('be.visible')
  })
  it('x 버튼 클릭시 모달 닫기', () => {
    cy.get('modal-stats .modal-close').click()
    cy.get('modal-stats').should('not.be.visible')
  })
  it('다시시작하기 클릭시 전체 리셋', () => {
    cy.get('form-winning form').submit()
    cy.get('modal-stats .btn-reset').click()
    cy.get('form-details').should('not.be.visible')
    cy.get('form-winning').should('not.be.visible')
    cy.get('modal-stats').should('not.be.visible')
    cy.get('form-price input').should('be.focused')
  })
})
