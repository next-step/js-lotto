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

  // 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
  // 로또 1장의 가격은 1,000원이다.
  // 소비자는 자동 구매를 할 수 있어야 한다.
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

  // 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.
  describe('번호보기를 토글하면', () => {
    it('각 로또의 번호를 표시하거나 숨길 수 있어야 한다', () => {
      cy.get('[data-cy="number-toggle"').as('toggle').check({ force: true })
      cy.get('[data-cy="lotto-ticket"]').each((el) => {
        cy.wrap(el).within(() => {
          const ticketNums = el[0].data.nums.join(',')
          cy.get('[data-cy="ticket"]').should('have.length', 1)
          cy.get('[data-cy="ticket-nums"]').should('be.visible').and('have.text', ticketNums)
        })
      })
      cy.get('@toggle').uncheck({ force: true })
      cy.get('[data-cy="ticket-nums"]').should('not.be.visible')
    })
  })

  describe('당첨번호를 입력하지 않고 결과 확인버튼을 누르면', () => {
    it('유효성 검사에서 에러가 발생해야 한다', () => {
      cy.get('[data-cy="result-form"]').within(() => {
        cy.get('[data-cy="result-btn"]').click({ forc: true })
        cy.get('input:invalid').should('have.length', 7)
      })
    })
  })

  describe('당첨번호에 중복된 숫자를 입력하면', () => {
    it('에러 메세지를 알림창으로 띄워야 한다', () => {
      const stub = addStubOnAlert()
      const message = '로또 번호에는 중복된 숫자를 입력할 수 없습니다.'
      const winningNums = [1, 2, 3, 4, 5, 5]
      const bonusNum = 6

      cy.get('[data-cy="winning-number"]').each((el, idx) => {
        cy.wrap(el).type(winningNums[idx], { force: true })
      })
      cy.get('[data-cy="bonus-number"]').type(bonusNum, { force: true })
      cy.get('[data-cy="result-btn"]')
        .click({ force: true })
        .then(() => {
          shouldStubToBeCalledWith(stub, message)
        })
    })
  })

  describe('당첨번호와 보너스 번호를 입력하고 결과 확인버튼을 누르면', () => {
    it('당첨 통계 모달창을 보여줘야 한다', () => {
      const winningNums = [11, 12, 13, 14, 15, 16]
      const bonusNum = 45

      cy.get('[data-cy="winning-number"]').each((el, idx) => {
        cy.wrap(el).type(winningNums[idx], { force: true })
      })
      cy.get('[data-cy="bonus-number"]').type(bonusNum, { force: true })
      cy.get('[data-cy="result-btn"]').click({ force: true })
      cy.get('[data-cy="modal-popup"]').should('be.visible')
    })
  })
})

// 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
// 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
describe('당첨 통계 모달이 표시되었을 때', () => {
  const winningNums = [11, 12, 13, 14, 15, 16]
  const bonusNum = 45

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy="order-input"]').type('3000', { force: true })
    cy.get('[data-cy="order-btn"]').click({ force: true })
    cy.get('[data-cy="winning-number"]').each((el, idx) => {
      cy.wrap(el).type(winningNums[idx], { force: true })
    })
    cy.get('[data-cy="bonus-number"]').type(bonusNum, { force: true })
    cy.get('[data-cy="result-btn"]').click({ force: true })
  })

  it('띄워진 모달창에는 올바른 당첨 갯수, 수익률을 표시해야 한다', () => {
    const result = {
      1: { count: 0, prize: 2_000_000_000 },
      2: { count: 0, prize: 30_000_000 },
      3: { count: 0, prize: 1_500_000 },
      4: { count: 0, prize: 50_000 },
      5: { count: 0, prize: 5_000 },
    }

    cy.log('당첨 번호 : ', winningNums.toString())
    cy.log('보너스 번호 : ', bonusNum)

    // 로또 결과 계산
    cy.get('[data-cy="lotto-ticket"]')
      .each(([el]) => {
        cy.log('로또 티켓 : ', el.data.nums.toString())
        const count = el.data.nums.filter((n) => winningNums.includes(n)).length
        const bonus = el.data.nums.includes(bonusNum)
        let rank = 0

        if (count === 6) {
          rank = 1
        } else if (count === 5 && bonus) {
          rank = 2
        } else if (count === 5) {
          rank = 3
        } else if (count === 4) {
          rank = 4
        } else if (count === 3) {
          rank = 5
        }

        if (!rank) return

        result[rank].count += 1
      })
      .then(() => {
        // 계산 결과와 모달 팝업의 정보가 일치하는지 테스트
        const earningRate = Object.values(result)
          .map(({ count, prize }) => count * prize)
          .reduce((acc, cur) => acc + cur, 0)

        ;[1, 2, 3, 4, 5].forEach((n) => {
          cy.get(`[data-cy="result-${n}"]`).should('have.text', `${result[n].count}개`)
        })

        cy.get('[data-cy="earning-rate"]').should('have.text', `당신의 총 수익률은 ${earningRate}%입니다.`)
      })
  })

  // 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.
  describe('다시 시작하기 버튼을 클릭하면', () => {
    it('초기 상태로 돌아가야 한다', () => {
      cy.get('[data-cy="reset"]').click({ force: true })
      cy.get('[data-cy="order-form"]').should('be.visible')
      cy.get('[data-cy="ticket-section"]').should('not.be.visible')
      cy.get('[data-cy="result-form"]').should('not.be.visible')
      cy.get('[data-cy="modal-popup"]').should('not.be.visible')
    })
  })
})
