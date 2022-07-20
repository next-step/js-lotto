import { ERROR_MESSAGE } from "../../src/js/constants";

describe('lotto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('1000원으로 로또 1장을 구입할 수 있어야 한다.', () => {
    cy.get('input[name=purchase-amount]').type(1000);
    cy.get('input[name=purchase-amount] + .btn').click({ force: true });

    cy.get('.lotto-ticket').should('have.length', 1)
  });
    
  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    cy.get('input[name=purchase-amount]').type(3000);
    cy.get('input[name=purchase-amount] + .btn').click();

    cy.get('.lotto-ticket').should('have.length', 3)
  });

  it('소비자는 자동 구매를 할 수 있어야 한다.', () => {
    cy.get('input[name=purchase-amount]').type(3000);
    cy.get('input[name=purchase-amount] + .btn').click();

    cy.get('.lotto-ticket').should('have.length', 3)
    cy.get('.lotto-ticket').should('be.visible')
  });

  it('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
    cy.get('input[name=purchase-amount]').type(3000);
    cy.get('input[name=purchase-amount] + .btn').click();

    cy.get('.lotto-ticket').should('have.length', 3)

    cy.get('input[type=checkbox]').check({ force: true });

    cy.get('.lotto-numbers').should('be.visible')
  });
});

describe('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수  있어야 한다.', () => {

  it('당첨 번호와 보너스 번호를 입력하지 않을 시 alert 창을 띄워줘야 한다.', () => {
    cy.get('.open-result-modal-button').click({ force: true });
    cy.on('window.alert()', (message) => {
      expect(message).to.equal(ERROR_MESSAGE.REQUIRED);
    });
  })

  it('당첨 번호에 중복된 숫자가 있으면 alert 창을 띄워줘야 한다.', () => {
    const lottoNumbers = [1, 1, 1, 1, 1, 1]
    const bonusNumber = 1;
    cy.fillWinningNumbers(lottoNumbers, bonusNumber);

    cy.get('.open-result-modal-button').click({ force: true });
    cy.on('window.alert()', (message) => {
      expect(message).to.equal(ERROR_MESSAGE.DUPLICATED_MESSAGE);
    });
  })

  it('결과 확인하기 버튼을 누르면 모달이 열려야 한다.', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6]
    const bonusNumber = 7;
    cy.fillWinningNumbers(lottoNumbers, bonusNumber);
    cy.get('.open-result-modal-button').click({ force: true });
    cy.get('.modal').should('be.visible');
  })
})

describe('다시 시작하기 버튼을 누르면 모든 값이 초기화 되어야 한다.', () => {

  it('다시 시작하기 버튼을 누르면 모달이 닫혀야 한다.', () => {
    cy.get('.close-result-modal-button').click({ force: true });
    cy.get('.modal').should('be.hidden');
  })

  it('다시 시작하기 버튼을 누르면 구입 금액이 초기화 되어야 한다.', () => {
    cy.get('input[name=purchase-amount]').should('be.empty')
  })

  it('다시 시작하기 버튼을 누른 후 구입 금액을 다시 넣고 확인을 누르면 해당 금액에 맞는 로또 티켓 수가 있어야 한다.', () => {
    cy.get('input[name=purchase-amount]').type(3000);
    cy.get('input[name=purchase-amount] + .btn').click({ force: true });

    cy.get('div.mx-1').should('have.length', 3)
  })

  it('다시 시작하기 버튼을 누른 후 구입 금액을 다시 넣고 확인을 누르면 당첨번호와 보너스 번호 값이 초기화 되어야 한다.', () => {
    Array.from({ length: 6 }).forEach(( _, index ) => {
      cy.get(`input[name=lotto-number-${index + 1}]`).should('be.empty')
    })
  })
})
