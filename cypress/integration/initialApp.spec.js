import setAliase from '../utils/setAlise';

describe('앱 초기 화면', () => {
  beforeEach(() => {
    cy.visit('/')
    setAliase();
  })
  it('구입금액칸이 보이고 입력칸은 비어있어야한다.', () => {
    cy.get('@pf').should('have.not.class', 'hidden')
    cy.get('@pfInput').should('have.value', '')
  });
  it('구입한 로또는 숨겨져 있어야 한다.', () => {
    cy.get('@lottos').should('have.class', 'hidden')
  })
  it('로또 당첨번호 입력폼은 숨겨져 있어야 한다.', () => {
    cy.get('@wf').should('have.class', 'hidden')
  })
  it('모달창은 보이지 않아야 한다.', () => {
    cy.get('@mo').should('have.not.class', 'open')
  });
  
})
