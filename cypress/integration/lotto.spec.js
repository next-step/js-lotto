const LottoResultPanel = require("../../src/js/Components/LottoResultPanel");
const {getTicket} = require("../../src/js/Utils/lottoNum");
describe("js-lotto", () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  getTicket()
  const resultPanel = new LottoResultPanel()


  // resultPanel.makeResultData(ticketNum, matchNumList)

  const inputMoney = (money) => {
    cy.get('.input-money').find('input').type(money);
    cy.get('.input-money').find('.btn').click();
  }

  const checkTickets = (money) => {
    const len = money / 1000
    cy.get('.tickets').find('li').its('length').should('eq', len)
  }

  const showTicketsNumber = () => {
    cy.get('.lotto-numbers-toggle-button').click({force: true})
    cy.get('.tickets').find('li:first .lotto-detail').should('have.not.class', 'hidden')
  }

  const inputLastWeekNum = (lastWeekNum) => {
    cy.get('.last-week-number').find('input[type="number"]').each((item, index) => {
      cy.get(item).type(lastWeekNum[index])
    })
    cy.get('.open-result-modal-button').click()
  }

  const openModal = () => {
    cy.get('.modal').should('have.class', 'open');
    cy.get('.modal').find('.earning-rate').contains(`당신의 총 수익률은 0%입니다.`)
  }

  const restart = () => {
    cy.get('.modal').find('button.restart').click();
    cy.get('.input-money').find('input').should('have.value', '');

  }


  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다', () => {

    inputMoney(2000)
    checkTickets(2000)
    showTicketsNumber();


    const lastWeekNum = getTicket(7)
    inputLastWeekNum(lastWeekNum)

    openModal();

    restart()
  })

})
