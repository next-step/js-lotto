import NOT_ALLOWED_PAY_UNIT from '../../src/js/models/lotto/messageConstants';

before(() => cy.visit('../../dist/index.html'));

const $payForm = () => cy.get('#lotto-pay-form');
const $payFormInput = () => $payForm().find('input');

const typePriceAndSubmit = (price) => {
  $payForm().type(price);
  $payForm().submit();
};

const isPurchasedSectionVisible = () =>
  cy.get('#lotto-purchased-section').then((elm) => elm.is(':visible'));

describe('로또 1장의 가격은 1,000원이다.', () => {
  afterEach(() => {
    $payFormInput().clear();
  });

  describe('1000원 단위로 로또를 구매 할 수 있다.', () => {
    it.only('1000원', () => {
      typePriceAndSubmit(1000);

      expect(isPurchasedSectionVisible()).to.be.true;
    });
  });

  describe('1000원 단위가 아닌 경우 유저에게 알럿을 표시한다.', () => {
    it('1000원', () => {
      typePriceAndSubmit(1200);

      cy.on('window:alert', (msg) => {
        expect(msg).to.contains(NOT_ALLOWED_PAY_UNIT);
      });
    });
  });
});
