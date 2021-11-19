// @ts-nocheck
import { ErrorMsgs, UNIT_PRICE } from '../../dist/constants.js'
before(() => {
  cy.visit('http://localhost:3000/')
})

describe('lotto step-1', () => {
  it('초기에는 입력창만 보여야 함', () => {
    cy.get('purchased-info').should('not.be.visible')
    cy.get('form-winning').should('not.be.visible')
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
      cy.get('purchased-info').should('be.visible')
      cy.get('form-winning').should('be.visible')
      cy.pickedItems().should('have.length', 3)
      cy.get('label[data-cy="amount-label"]').contains(3)
    })
    it('단위금액 이하는 버림한다.', () => {
      cy.inputPrice(UNIT_PRICE * 7.7)
      cy.pickedItems().should('have.length', 7)
      cy.get('label[data-cy="amount-label"]').contains(7)
    })
  })

  describe('번호보기 클릭시 구매한 로또 번호 목록이 나타남', () => {
    it('숫자는 총 6개이며 각각 1부터 45 사이이고 중복되지 않음.', () => {
      cy.get('input[data-cy="toggle-button"]').click({ force: true })
      cy.pickedItems().each($el => {
        const numbers = $el.find('.numbers').text().split(', ')
        expect(numbers.length).to.equal(6)
        expect(new Set(numbers).size).to.equal(numbers.length)
        numbers.forEach(n => {
          expect(+n).to.be.within(1, 45)
        })
      })
    })
  })
})

describe('lotto step-2', () => {
  it('당첨번호 중복 에러', () => {
    cy.fillWinningNumbers([1, 2, 3, 4, 5, 6, 6])
    cy.on('window.alert', text => expect(text).to.be(ErrorMsgs.DUPLICATED))
  })
  it('당첨번호 정상시 모달 노출', () => {
    cy.fillWinningNumbers([
      '{backspace}1',
      '{backspace}2',
      '{backspace}3',
      '{backspace}4',
      '{backspace}5',
      '{backspace}6',
      '{backspace}7',
    ])
    cy.get('modal-stats').should('be.visible')
  })
  it('x 버튼 클릭시 모달 닫기', () => {
    cy.get('modal-stats .modal-close').click()
    cy.get('modal-stats').should('not.be.visible')
  })
  it('다시시작하기 클릭시 전체 리셋', () => {
    cy.get('form-winning form').submit()
    cy.get('modal-stats .btn-reset').click()
    cy.get('purchased-info').should('not.be.visible')
    cy.get('form-winning').should('not.be.visible')
  })
})
