import { ERROR_MESSAGES } from '../../src/js/utils/constant.js';

describe('로또 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('');
  });

  // # 로또 구입 금액을 입력한다.
  it('로또 구입 금액 입력할 input 태그가 있다.', () => {
    cy.getDataset('purchase-price-input').should('exist');
  });

  it('로또 구입 금액을 입력하면 그대로 보여진다.', () => {
    cy.getDataset('purchase-price-input').type('1000');
    cy.getDataset('purchase-price-input').should('have.value', '1000');
  });

  it('금액은 숫자만 입력된다.', () => {
    cy.getDataset('purchase-price-input').type('ab가갸1cd000거겨');
    cy.getDataset('purchase-price-input').should('have.value', '1000');
  });

  // # 금액에 해당하는 로또를 발급해야 한다.
  it('확인 버튼이 있다.', () => {
    cy.getDataset('purchase-price-button').should('exist');
  });

  it('확인 버튼을 클릭할 수 있다.', () => {
    cy.getDataset('purchase-price-button').click();
  });

  it('금액에 맞는 로또 개수를 발급한다.', () => {
    cy.purchaseLotto('1000');
    cy.getDataset('total-purchase').should('have.text', '1');
  });

  it('엔터를 누르면 로또가 발급된다.', () => {
    cy.getDataset('purchase-price-input').type('1000{enter}');
    cy.getDataset('total-purchase').should('have.text', '1');
  });

  it('로또 아이콘이 개수에 맞게 나타난다.', () => {
    cy.purchaseLotto('10000');
    cy.getDataset('ticket-icon').should('have.length', 10);
  });

  // # 로또 1장의 가격은 1,000원이다.
  it('금액이 음수일 경우 alert을 띄워준다.', () => {
    cy.purchaseLotto('-1000');
    cy.on('window:alert', t => {
      expect(t).to.equal(ERROR_MESSAGES.CANNOT_NEGATIVE_PRICE);
    });
  });

  it('금액이 1000원 단위로 입력이 되지 않았을 경우 alert을 띄워준다.', () => {
    cy.purchaseLotto('1111');
    cy.on('window:alert', t => {
      expect(t).to.equal(ERROR_MESSAGES.INCORRECT_UNIT_OF_PRICE);
    });
  });

  it('금액이 쵀대 금액을 넘을경우 alert을 띄워준다.', () => {
    cy.purchaseLotto('1000000');
    cy.on('window:alert', t => {
      expect(t).to.equal(ERROR_MESSAGES.EXCEED_PRICE);
    });
  });
});
