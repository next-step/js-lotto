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

  describe('modal ui 테스트', () => {
    beforeEach(() => {
      Cypress.Commands.add('winningNumberSubmit', () => {
        cy.get('[data-winning-numbers=input]').each((tag, i) => {
          cy.wrap(tag).type(i+1)
        }).then(() => {
          cy.get('[data-winning-numbers=submit]').click()
        })
      })      
    })

    it('당첨번호를 제출하면 모달창이 나온다.', () => {
      cy.submitValue('click', true)
      cy.winningNumberSubmit()
      cy.get('[data-modal=modal]').then((modal) => {
        expect(modal).to.be.visible
      })
    })

    it('모달창에서 x이미지를 누르면 모달창이 꺼진다.', () => {
      cy.submitValue('click', true)
      cy.winningNumberSubmit()
      cy.get('[data-modal=close]').click()
      cy.get('[data-modal=modal]').should('not.be.visible')
    })

    it('모달창에서 다시하기 버튼을 누르면 어플리케이션이 초기화된다.', () => {
      cy.submitValue('click', true)
      cy.winningNumberSubmit()
      cy.get('[data-modal=restart]').click()
      const toggleUI = [cy.get('[data-ticket=section]'), cy.get('[data-winning-numbers=form]')]
      toggleUI.forEach(tag => tag.should('not.be.visible'))
      cy.get('[data-amount=input]').should('have.value', '')
    })

    it('로또 티켓 번호들과 당첨 번호를 비교하여 당첨 갯수를 모달창에 표시한다', () => {
      // 테스트 코드
    })

    it('당첨 등수, 갯수, 구입가격을 계산하여 수익률을 모달창에 표시한다. ', () => {
      // 테스트 코드
    })
  })
})
