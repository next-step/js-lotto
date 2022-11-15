describe('로또 구입 금액 입력', () => {
  const $inputPurchase = '[data-cy="input-purchase"]';
  const $submitPurchase = '[data-cy="submit-purchase"]';
  const $messagePurchase = '[data-cy="message-purchase-error"]';
  const min = 1000;
  const max = 100000;

  beforeEach(() => {
    cy.visit('/');
  });

  it('숫자만 입력할 수 있다', () => {
    cy.get($inputPurchase).type('1000e')
      .should('have.value', 1000);
  });

  it('숫자만 입력할 수 있다 (음수)', () => {
    cy.get($inputPurchase).type('-1000')
      .should('have.value', 1000);
  });

  it(`${min} 단위의 값만 허용한다`, () => {
    cy.get($inputPurchase).type(`${min + 1}`);
    cy.get($submitPurchase).click();
    cy.get($messagePurchase).should('be.visible')
      .should('have.text', `${min} 단위로 입력해 주세요`);
  });

  it(`${min} ~ ${max} 사이의 값만 허용한다 (0 입력)`, () => {
    cy.get($inputPurchase).type('0');
    cy.get($submitPurchase).click();
    cy.get($messagePurchase).should('be.visible')
      .should('have.text', '값을 입력해 주세요');
  });

  it(`${min} ~ ${max} 사이의 값만 허용한다 (${min} 이하)`, () => {
    cy.get($inputPurchase).type(`${min - 1}`);
    cy.get($submitPurchase).click();
    cy.get($messagePurchase).should('be.visible')
      .should('have.text', `${min} ~ ${max} 사이의 값을 입력해 주세요`);
  });

  it(`${min} ~ ${max} 사이의 값만 허용한다 (${max} 이상)`, () => {
    cy.get($inputPurchase).type(`${max + 1000}{enter}`);
    cy.get($messagePurchase).should('be.visible')
      .should('have.text', `${min} ~ ${max} 사이의 값을 입력해 주세요`);
  });

  it('올바른 값 입력 시, input 내의 내용을 지운다', () => {
    cy.get($inputPurchase).type(`${min}{enter}`)
      .should('have.value', '');
  });
});

describe('로또 구입 후 확인', () => {
  const $inputPurchase = '[data-cy="input-purchase"]';
  const $messageTotal = '[data-cy="message-purchase-total"]';
  const $ticketList = '[data-cy="ticket-list"]';
  const $btnViewNumber = '[data-cy="btn-view-number"]';

  beforeEach(() => {
    cy.visit('/');
    cy.get($inputPurchase).type(`5000{enter}`);
  });

  it('구매 문구 확인', () => {
    cy.get($messageTotal).should('have.text', '총 5개를 구매하였습니다.');
  });

  it('발행된 티켓 갯수 확인', () => {
    cy.get($ticketList).children().should('have.length', 5);
  });

  it('번호보기 버튼 on 시, 번호를 확인할 수 있다', () => {
    cy.get($btnViewNumber).click();

    cy.get($ticketList).children().each((item) => {
      const $numbers = item.children('.numbers');
      expect($numbers).to.be.visible;
    });
  });

  it('번호보기 버튼 off 시, 번호를 숨긴다', () => {
    cy.get($btnViewNumber).click();
    cy.get($btnViewNumber).click();
    cy.get($ticketList).children().each((item) => {
      const $numbers = item.children('.numbers');
      expect($numbers).to.not.visible;
    });
  });
});
