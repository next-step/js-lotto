const $inputPurchase = '#input-purchase';
const $submitPurchase = '#btn-purchase-submit';
const $messagePurchase = '#form-purchase .error-message';
const $resultWrap = '.result-wrap';
const $messageTotal = '.message-purchase-total';
const $ticketList = '.ticket-list';
const $btnViewNumber = '[data-cy="btn-toggle-numbers"]';
const min = 1000;
const max = 100000;

function typeInputPurchase(value) {
  cy.get($inputPurchase).type(value);
}

function checkToHave(element, chainer, value) {
  cy.get(element).should(`have.${chainer}`, value);
}

function clearValue(element) {
  cy.get(element).clear();
}

function checkVisible(element) {
  cy.get(element).should('be.visible');
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

describe('로또 구입 금액 입력', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('숫자만 입력할 수 있다', () => {
    const testValue = ['1000e', '-1000'];

    testValue.forEach(value => {
      typeInputPurchase(value);
      checkToHave($inputPurchase, 'have', 1000);
      clearValue($inputPurchase);
    });
  });

  it(`${min} 단위의 값만 허용한다`, () => {
    typeInputPurchase(`${min + 1}`);
    cy.get($submitPurchase).click();
    checkVisible($messagePurchase);
    checkToHave($messagePurchase, 'text', `${min} 단위로 입력해 주세요`);
  });

  it(`${min} ~ ${max} 사이의 값만 허용한다 (값 미입력)`, () => {
    const testValue = [' ', '0'];

    testValue.forEach(value => {
      typeInputPurchase(value);
      cy.get($submitPurchase).click();
      checkVisible($messagePurchase);
      checkToHave($messagePurchase, 'text', '값을 입력해 주세요');
    });
  });

  it(`${min} ~ ${max} 사이의 값만 허용한다`, () => {
    const testValue = [`${min - 1}`, `${max + 1000}`];

    testValue.forEach(value => {
      typeInputPurchase(value);
      cy.get($submitPurchase).click();
      checkVisible($messagePurchase);
      checkToHave($messagePurchase, 'text', `${min} ~ ${max} 사이의 값을 입력해 주세요`);
    });
  });

  it('올바른 값 입력 시, input 내의 내용을 지운다', () => {
    typeInputPurchase(min);
    cy.get($submitPurchase).click();
    checkToHave($inputPurchase, 'text', '');
  });
});

describe('로또 구입 후 확인', () => {
  let ticketNum;

  beforeEach(() => {
    cy.visit('/');
    ticketNum = getRandomNumber();
    typeInputPurchase(`${ticketNum * 1000}`);
    cy.get($submitPurchase).click();
  });

  it('구매 문구 확인', () => {
    checkVisible($resultWrap);
    checkToHave($messageTotal, 'text', `총 ${ticketNum}개를 구매하였습니다.`);
  });

  it('발행된 티켓 갯수 확인', () => {
    checkToHave(`${$ticketList} > li`, 'length', ticketNum);
  });

  it('번호보기 버튼 on 시, 번호를 확인할 수 있다', () => {
    cy.get($btnViewNumber).click();

    cy.get($ticketList).children().each(item => {
      const $numbers = item.children('.numbers');
      expect($numbers).to.be.visible;
    });
  });

  it('번호보기 버튼 off 시, 번호를 숨긴다', () => {
    cy.get($btnViewNumber).click();
    cy.get($btnViewNumber).click();
    cy.get($ticketList).children().each(item => {
      const $numbers = item.children('.numbers');
      expect($numbers).to.not.visible;
    });
  });
});
