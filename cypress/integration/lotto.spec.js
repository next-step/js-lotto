describe('Lotto 테스트', () => {
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

  describe('Lotto 구입 input 테스트', () => {
    before(() => {
      Cypress.Commands.add('checkAlert', () => {
        cy.on('window:alert', (text) => {
          expect(text).to.contains('로또 구입 금액을 1,000원 단위로 입력해 주세요');
        });
      })
    })
      
    describe('금액 단위 체크 테스트', () => {
      it('금액 단위가 1000원 단위가 아니면 alert 창이 나온다 (텍스트는 “로또 구입 금액을 1,000원 단위로 입력해 주세요" 이다)', () => {
        cy.submitValue('enter', false)
        cy.checkAlert()
      })

      it('금액 단위가 1000원 단위가 아닐 때 alert 확인 버튼 클릭 시 input tag 초기화', () => {  
        cy.submitValue('click', false)
        cy.checkAlert()
        cy.on('window:alert', () => true)
        cy.get('[data-amount=input]').should('have.value', '')
      })
    })


    describe('input event에 따른 UI 변화', () => {
      it('input validation 실패 시 하위 UI를 볼 수 없다.', () => {
        cy.submitValue('click', false)
        cy.on('window:alert', () => true)
        cy.get('[data-ticket=section]').should('not.be.visible')
        cy.get('[data-winning-numbers=form]').should('not.be.visible')
      })

      it('input validation 성공 시 하위 UI를 볼 수 있다.', () => {
        cy.submitValue('click', true)
        cy.on('window:alert', () => true)
        cy.get('[data-ticket=section]').should('be.visible')
        cy.get('[data-winning-numbers=form]').should('be.visible')
      })
    })

  })

  describe('Lotto 구입 후 Ticket 테스트', () => {
    beforeEach(() => {
      cy.submitValue('click', true)
    })

    describe('Ticket 개수에 영향을 받는 테스트', () => {
      it('구매한 티켓에 따라 총 개수 확인.', () => {
        cy.get('#counted-ticket').should('have.text', '총 10개를 구매하였습니다.')
      })
  
      it('구매한 티켓에 티켓 이미지 컴포넌트 생성', () => {
        cy.get('[data-ticket=list]').find('[data-ticket=image]').should('have.length', 10)
      })
    })

    describe('Ticket toggle 테스트', () => {
      beforeEach(() => {
        cy.get('.switch').click()
      })

      it('Toggle click event에 따라 랜덤 숫자가 보여야 한다.', () => {
        cy.get('[data-ticket=list]').find('[data-ticket=numbers]').should('be.visible')
      })
  
      it('각 티켓의 랜덤 숫자들은 중복되지 않아야 한다.', () => {
        cy.get('[data-ticket=numbers]').should($ticketNumber => {
          $ticketNumber.toArray().map(number => {
            const set = new Set(number.textContent.split(', '));
            expect(set.size).to.equal(6)
          })
        })
      })
    })    
  })
})
