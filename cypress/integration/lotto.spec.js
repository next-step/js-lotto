import { LOTTO_INFORMATION } from '../../src/js/constants';

describe('로또 구입 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    cy.insertMoney(7_000);
    cy.purchase(7);
  });

  it('로또 1장의 가격은 1,000원이다.(1,000원 이하로 금액을 입력할 경우)', () => {
    cy.insertMoney(900);
    cy.purchaseAlert(
      `${LOTTO_INFORMATION.PRICE_UNIT.toLocaleString()}원부터 입력이 가능합니다.`
    );
  });

  it('로또 1장의 가격은 1,000원이다.(1,000원 단위가 아닌 금액으로 입력한 경우)', () => {
    cy.insertMoney(1_200);
    cy.purchaseAlert(
      `로또 구입 금액을 ${LOTTO_INFORMATION.PRICE_UNIT.toLocaleString()}원 단위로 입력해 주세요.`
    );
  });

  it('복권 번호는 번호 보기 토글 버튼을 클릭하면 볼 수 있어야 한다.', () => {
    cy.insertMoney(10_000);

    cy.clickToggleButton();

    cy.isVisibleLottoNumbers(10);

    cy.clickToggleButton();

    cy.isUnVisibleLottoNumbers();
  });
});

Cypress.Commands.add('insertMoney', (price) => {
  cy.get('.price-input').type(String(price));
  cy.get('.confirm').click();
});

Cypress.Commands.add('purchase', (count) => {
  cy.get('.lotto-result-list-item').its('length').should('eq', count);
});

Cypress.Commands.add('purchaseAlert', (alertText) => {
  cy.on('window:alert', (text) => {
    expect(text).to.equal(alertText);
  });
  cy.on('window:confirm', () => true);
});

Cypress.Commands.add('isVisibleLottoNumbers', (count) => {
  cy.get('.lotto-result-list-item').its('length').should('eq', count);
  cy.get('.lotto-result-number-list').its('length').should('eq', count);
  cy.get('.lotto-result-number-list').each((item) =>
    cy.wrap(item).should('be.visible')
  );
});

Cypress.Commands.add('isUnVisibleLottoNumbers', () => {
  cy.get('.lotto-result-number-list').each((item) =>
    cy.wrap(item).should('not.be.visible')
  );
});

Cypress.Commands.add('clickToggleButton', () => {
  cy.get('.switch').click();
});
