const { getTicket } = require('../../src/js/Utils/lottoNum')
describe('js-lotto', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  getTicket()

  const inputMoney = (money) => {
    cy.get('.input-money').find('input').type(money)
    cy.get('.input-money').find('.btn').click()
  }

  const checkTickets = (money) => {
    const len = money / 1000
    cy.get('.tickets').find('li').its('length').should('eq', len)
  }

  const showTicketsNumber = () => {
    cy.get('.lotto-numbers-toggle-button').click({ force: true })
    cy.get('.tickets').find('li:first .lotto-detail').should('have.not.class', 'hidden')
  }

  const inputLastWeekNum = () => {
    const lastWeekNum = getTicket(7)
    cy.get('.last-week-number').find('input[type="number"]').each((item, index) => {
      cy.get(item).type(lastWeekNum[index])
    })
    cy.get('.open-result-modal-button').click()
  }

  const openModal = () => {
    cy.get('.modal').should('have.class', 'open')
    cy.get('.modal').find('.earning-rate span').should('have.class', 'profit')
  }

  const restart = () => {
    cy.get('.modal').find('button.restart').click()
    cy.get('.input-money').find('input').should('have.value', '')
  }

  const checkAlertMessage = (message) => {
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains(message)
    })
  }
  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    const pocketMoney = 2000
    inputMoney(pocketMoney)
    checkTickets(pocketMoney)
  })

  it('로또는 1000원 단위로만 구매할 수 있습니다.', () => {
    const pocketMoney = 9999
    inputMoney(pocketMoney)
    checkAlertMessage('로또 구입 금액을 1,000원 단위로 입력해 주세요.')
  })

  it('번호보기 버튼을 통해 자동구매된 로또는 확인할 수 있습니다.', () => {
    const pocketMoney = 2000
    inputMoney(pocketMoney)
    checkTickets(pocketMoney)
    showTicketsNumber()
  })

  it('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
    const pocketMoney = 2000
    inputMoney(pocketMoney)
    checkTickets(pocketMoney)
    showTicketsNumber()
    const lastWeekNum = getTicket(7)
    inputLastWeekNum(lastWeekNum)
    openModal()
  })

  it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
    const pocketMoney = 2000
    inputMoney(pocketMoney)
    checkTickets(pocketMoney)
    showTicketsNumber()
    inputLastWeekNum()
    openModal()
    restart()
  })

})
