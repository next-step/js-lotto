/**
 * alert 테스트를 위한 stub 생성 및 이벤트 등록
 *
 * - window.alert 이벤트 발생 시 stub함수 호출
 */
function addStubOnAlert() {
  const stub = cy.stub()
  cy.on('window:alert', stub)

  return stub
}

/**
 * stub 함수가 message를 파라미터로 받으면서 호출되었는지 테스트
 */
function shouldStubToBeCalledWith(stub, message) {
  expect(stub.getCall(0)).to.be.calledWith(message)
}

// 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
// 로또 1장의 가격은 1,000원이다.
// 소비자는 자동 구매를 할 수 있어야 한다.

// 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.
// 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
// 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
// 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

describe('처음 페이지가 로드되면', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('구매 폼만 보여야 한다', () => {
    cy.get('[data-cy="order-form"]').should('be.visible')
    cy.get('[data-cy="ticket-section"]').should('not.be.visible')
    cy.get('[data-cy="result-form"]').should('not.be.visible')
  })

  it('구매 폼은 입력가능해야 한다', () => {
    cy.get('[data-cy="order-input"]').should('not.be.disabled')
    cy.get('[data-cy="order-btn"]').should('not.be.disabled')
  })

  describe('구입 금액이 1000원 미만일 때 확인 버튼을 누르면', () => {
    it('유효성 검사에서 에러가 발생해야 한다', () => {
      cy.get('[data-cy="order-form"]').within(() => {
        cy.get('[data-cy="order-input"]').type('900', { force: true })
        cy.get('[data-cy="order-btn"]').click({ force: true })
        cy.get('input:invalid').should('have.length', 1)
      })
    })
  })

  describe('구입 금액이 1000원 단위가 아닐 때 확인 버튼을 누르면', () => {
    it('에러 메세지를 알림창으로 띄워야 한다', () => {
      const stub = addStubOnAlert()
      const message = '로또 구입 금액을 1,000원 단위로 입력해 주세요.'

      cy.get('[data-cy="order-input"]').type('2500', { force: true })
      cy.get('[data-cy="order-btn"]')
        .click({ force: true })
        .then(() => {
          shouldStubToBeCalledWith(stub, message)
        })
    })
  })

  describe('구입 금액을 입력하고 확인 버튼을 누르면', () => {
    beforeEach(() => {
      cy.get('[data-cy="order-input"]').type('4000', { force: true })
      cy.get('[data-cy="order-btn"]').click({ force: true })
    })

    it('구입 금액에 맞는 로또 갯수를 표시해야 한다', () => {
      cy.get('[data-cy="ticket-section"]').should('be.visible')
      cy.get('[data-cy="ticket"]').should('have.length', 4)
    })
    it('결과 폼을 표시해야 한다', () => {
      cy.get('[data-cy="result-form"]').should('be.visible')
    })
  })
})

describe('로또를 구매한 이후', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy="order-input"]').type('5000', { force: true })
    cy.get('[data-cy="order-btn"]').click({ force: true })
  })

  it('당첨번호와 보너스 번호를 입력할 수 있어야 한다', () => {
    cy.get('[data-cy="winning-number"]').as('winningNumbers').should('have.length', 6)
    cy.get('@winningNumbers').each((el) => {
      cy.wrap(el).should('not.be.disabled').and('be.visible')
    })
    cy.get('[data-cy="bonus-number"]').should('not.be.disabled').and('be.visible')
  })

  describe('번호보기를 토글하면', () => {
    it('각 로또의 번호를 표시하거나 숨길 수 있어야 한다', () => {
      cy.get('[data-cy="number-toggle"').as('toggle').check({ force: true })
      cy.get('[data-cy="lotto-ticket"]').each((el) => {
        cy.wrap(el).within(() => {
          cy.get('[data-cy="ticket"]').should('have.length', 1)
          cy.get('[data-cy="ticket-nums"]').should('be.visible').and('have.text', el[0].data.nums.join(','))
        })
      })
      cy.get('@toggle').uncheck({ force: true })
      cy.get('[data-cy="ticket-nums"]').should('not.be.visible')
    })
  })

  describe('당첨번호를 전부 입력하지 않고 결과 확인버튼을 누르면', () => {
    it('유효성 검사에서 에러가 발생해야 한다', () => {})
  })

  describe('보너스 번호를 입력하지 않고 확인버튼을 누르면', () => {
    it('유효성 검사에서 에러가 발생해야 한다', () => {})
  })

  describe('당첨번호에 숫자를 입력하지 않으면', () => {
    it('유효성 검사에서 에러가 발생해야 한다', () => {})
  })

  describe('당첨번호에 중복된 숫자를 입력하면', () => {
    it('에러 메세지를 알림창으로 띄워야 한다', () => {})
  })

  describe('당첨번호와 보너스 번호를 입력하고 결과 확인버튼을 누르면', () => {
    it('당첨 통계 모달창을 보여줘야 한다', () => {})
  })
})

describe('당첨 통계 모달이 표시되었을 때', () => {
  it('띄워진 모달창에는 올바른 당첨 갯수, 수익률을 표시해야 한다', () => {})

  describe('다시 시작하기 버튼을 클릭하면', () => {
    it('초기 상태로 돌아가야 한다', () => {})
  })
})
