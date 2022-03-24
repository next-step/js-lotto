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

  it('당첨번호 input value에 min은 1 max는 45이다', () => {
    cy.submitValue('enter', true)
    cy.get('[data-winning-numbers=input]').should($winningNumber => {
      $winningNumber.toArray().map(number => {
        cy.get(number).should(($input => {
          const text = $input.text()
          expect(text).to.be.within(1, 45)
        }))
      })
    })
  })
})
