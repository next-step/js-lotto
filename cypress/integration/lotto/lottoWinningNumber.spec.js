describe('Lotto 당첨 번호 테스트', () => {
  beforeEach(() => {
    cy.visit('/')
    const checkKeyBoardEvent = correct => {
      if (correct) {
        cy.get('[data-amount=input]').type('10000{enter}')
      } else {
        cy.get('[data-amount=input]').type('1234{enter}')
      }
    }
    
    const checkClickEvent = correct => {
      if (correct) {
        cy.get('[data-amount=input]').type('10000')
        cy.get('[data-amount=btn]').click()
      } else {
        cy.get('[data-amount=input]').type('1234')
        cy.get('[data-amount=btn]').click()
      }
    }

    Cypress.Commands.add('submitValue', (options, correct) => {
      if (options === 'enter') checkKeyBoardEvent(correct)
      if (options === 'click') checkClickEvent(correct)  
    })
  })

  it('당첨번호 input 자리수 두자리로 제한된다.', () => {
    cy.submitValue('click', true)
    cy.get('[data-winning-numbers=input]').each(element => {
      cy.wrap(element).type(123)
    }).each((element) => {
      const value = Number(element.val())
      expect(value).to.be.within(1, 45)
    })
  })

  it('당첨번호 input에 중복된 숫자 입력시 alert 메세지 "로또 번호에는 중복된 숫자를 입력할 수 없습니다."가 나온다.', () => {
    cy.submitValue('click', true)
    cy.get('[data-winning-numbers=input]').each(element => {
      cy.wrap(element).type(12)
    }).then(() => {
      cy.get('[data-winning-numbers=submit]').click()
      cy.on('window:alert', (text) => {
        expect(text).to.contains('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
      });
    })
  })

  
})
