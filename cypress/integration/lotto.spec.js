import { LOTTO_PRICE_UNIT_NOT_MATCH_MESSAGE, LOTTO_NUMBER_COUNT } from '../../src/js/constants.js';

describe('로또 구매 시', () => {
  const getLottoBuyPriceInput = () => cy.get('.lotto-buy-price-input');
  const getLottoBuySubmitButton = () => cy.get('.lotto-buy-submit-button');
  const getLottoListSwitch = () => cy.get('.switch');
  const getLottoListContainer = () => cy.get('.lotto-list-container');
  const getLottoListCount = () => cy.get('.lotto-list-count');
  const getLottoItem = () => cy.get('.lotto-item');
  const getLottoNumber = () => cy.get('.lotto-number');
  const getLottoWinningForm = () => cy.get('.lotto-winning-form');

  beforeEach(() => {
    cy.visit('/');
  });

  describe('구매 전에는', () => {
    it('발급된 로또 영역이 노출되지 않는다.', () => {
      getLottoListContainer().should('not.visible');
    });

    it('결과 확인하기 입력 폼 영역이 노출되지 않는다.', () => {
      getLottoWinningForm().should('not.visible');
    });
  });

  it('구매 금액이 1,000원 단위가 아닌 경우 사용자 경고 메세지를 출력한다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    getLottoBuyPriceInput().type('1108');
    getLottoBuySubmitButton()
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(LOTTO_PRICE_UNIT_NOT_MATCH_MESSAGE);
      });
  });

  it('구매 금액에 맞게 로또가 발급된다.', () => {
    getLottoBuyPriceInput().type('2000');
    getLottoBuySubmitButton().click();
    getLottoListCount().should('have.text', '2');
    getLottoItem().should('have.length', 2);
  });

  describe('번호보기 토글 버튼을 클릭하면', () => {
    beforeEach(() => {
      getLottoBuyPriceInput().type('3000');
      getLottoBuySubmitButton().click();
      getLottoListSwitch().click();
    });

    it('복권 번호를 확인할 수 있다.', () => {
      getLottoNumber().should('have.length', 3);
    });

    it('로또 번호는 중복되지 않는다.', () => {
      getLottoNumber().then(($elements) => {
        Cypress.$.makeArray($elements).forEach(($element) => {
          const numbersRemoveDuplication = new Set($element.textContent.split(','));
          expect(numbersRemoveDuplication.size).to.eq(LOTTO_NUMBER_COUNT);
        });
      });
    });

    it('로또 번호는 7개여야 한다.', () => {
      getLottoNumber().then(($elements) => {
        Cypress.$.makeArray($elements).forEach(($element) => {
          const numbers = $element.textContent.split(',');
          expect(numbers.length).to.eq(7);
        });
      });
    });
  });

  it('번호보기 토글 버튼을 끄면하면 복권 번호가 감춰진다..', () => {
    getLottoBuyPriceInput().type('3000');
    getLottoBuySubmitButton().click();
    getLottoListSwitch().click();
    getLottoListSwitch().click();
    getLottoNumber().should('have.length', 0);
  });
});
