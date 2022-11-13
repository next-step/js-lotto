const { ERROR_MESSAGE } = require('../../src/js/constants/lotto');

describe('로또 어플리케이션을 테스트한다.', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('화면에 구입 금액을 입력할 input 태그가 존재한다.', () => {
    cy.getByDataset('purchase-price-input').should('exist');
  });

  it('input 태그에 구입 금액을 입력하면 입력한 금액이 input 태그의 value 값과 같아야 한다.', () => {
    cy.getByDataset('purchase-price-input').type('5000');

    cy.getByDataset('purchase-price-input').should('have.value', '5000');
  });

  it('구입 금액은 숫자만 입력할 수 있다.', () => {
    cy.getByDataset('purchase-price-input').type('ab2000cd');

    cy.getByDataset('purchase-price-input').should('have.value', '2000');
  });

  it('화면에 로또를 발급할 때 클릭해야 할 버튼이 존재한다.', () => {
    cy.getByDataset('purchase-button').should('exist');
  });

  it('로또 구입 금액을 1000원 단위로 입력하지 않고 확인 버튼을 클릭하면 사용자에게 alert를 띄워준다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.getByDataset('purchase-price-input').type('1500');

    cy.getByDataset('purchase-button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT);
      });
  });

  it('로또 구입 금액을 1000원 단위로 입력하지 않고 키보드의 엔터키를 누르면 사용자에게 alert를 띄워준다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.getByDataset('purchase-price-input')
      .type('1500{enter}')
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT);
      });
  });

  it('로또 구입 금액을 음수로 입력하고 확인 버튼을 클릭하면 사용자에게 alert를 띄워준다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.getByDataset('purchase-price-input').type('-1000');

    cy.getByDataset('purchase-button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_NEGATIVE_LOTTO_PRICE);
      });
  });

  it('구입할 금액을 입력하고 확인 버튼을 클릭하면 화면에 구매 안내메시지의 개수가 구입한 로또의 개수와 일치해야 한다.', () => {
    cy.getByDataset('purchase-price-input').type('5000');

    cy.getByDataset('purchase-button').click();

    cy.getByDataset('lotto-purchase-count-text').should('have.text', '5');
    cy.getByDataset('lotto-icon').should('have.length', '5');
  });

  it('구입할 금액을 입력하고 키보드의 엔터를 누르면 화면에 구매 안내메시지의 개수가 구입한 로또의 개수와 일치해야 한다.', () => {
    cy.getByDataset('purchase-price-input').type('5000{enter}');

    cy.getByDataset('lotto-purchase-count-text').should('have.text', '5');
    cy.getByDataset('lotto-icon').should('have.length', '5');
  });

  it('구입할 금액을 입력하고 확인 버튼을 클릭하면 화면에 로또 아이콘의 개수가 구입한 로또의 개수와 일치해야 한다.', () => {
    cy.getByDataset('purchase-price-input').type('5000');

    cy.getByDataset('purchase-button').click();

    cy.getByDataset('lotto-icon').should('have.length', '5');
  });

  it('로또를 발급하고 난 후에, 화면에 번호보기 토글 버튼이 존재한다.', () => {
    cy.getByDataset('purchase-price-input').type('5000');

    cy.getByDataset('purchase-button').click();

    cy.getByDataset('lotto-numbers-toggle-button').should('exist');
  });

  it('번호보기 토글 버튼을 클릭하면 각각의 로또 아이콘에 번호가 보여져야 한다.', () => {
    cy.getByDataset('purchase-price-input').type('5000');
    cy.getByDataset('purchase-button').click();

    cy.getByDataset('lotto-numbers-toggle-button').check({ force: true });

    cy.getByDataset('lotto-detail-number').should('exist');
  });

  it('번호보기 토글 버튼을 클릭해서 checked가 된 상태에서 토글 버튼을 다시 클릭하면 로또 아이콘에 번호가 사라져야 한다.', () => {
    cy.getByDataset('purchase-price-input').type('5000');
    cy.getByDataset('purchase-button').click();
    cy.getByDataset('lotto-numbers-toggle-button').check({ force: true });
    cy.getByDataset('lotto-detail-number').should('exist');

    cy.getByDataset('lotto-numbers-toggle-button').uncheck({ force: true });

    cy.getByDataset('lotto-detail-number').should('have.class', 'none');
  });
});
