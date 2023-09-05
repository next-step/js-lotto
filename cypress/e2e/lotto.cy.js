const SELECTOR = Object.freeze({
  PRICE_FORM: '#purchase-amount-form',
  PRICE_BUTTON: '#purchase-amount__button',
  LOTTO_ICON: '[data-ticket="purchase-lottos__ticket"]',
  LOTTO_SWITCH: '#lotto-numbers-toggle-button',
  LOTTO_CANDIDATE: '[data-candidate="lotto-candidate"]',
});

const isVisible = (selector) => {
  cy.get(selector).should('be.visible');
};

const hasValidLength = (selector, times = 1) =>
  cy.get(selector).should('have.length', times);

const click = (selector, times = 1) => {
  Array(times)
    .fill(null)
    .forEach(() => {
      cy.get(selector).click();
    });
};

const typing = (selector, value) => cy.get(selector).type(value);

const check = (selector, isForce = true) =>
  cy.get(selector).check({ force: isForce });

const uncheck = (selector, isForce = true) =>
  cy.get(selector).uncheck({ force: isForce });

describe('로또 구입, 발행', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('페이지에 접속하고, 구입 금액 입력 폼이 있는지 확인한다.', () => {
    isVisible(SELECTOR.PRICE_FORM);
  });

  it('페이지에 접속하고, 구입 금액 확인 버튼이 있는지 확인한다.', () => {
    isVisible(SELECTOR.PRICE_BUTTON);
  });

  it('구입 금액을 입력후, 확인 버튼을 누르면 로또가 발행되서 로또 아이콘이 보인다.', () => {
    typing(SELECTOR.PRICE_FORM, 5_000);
    click(SELECTOR.PRICE_BUTTON);
    isVisible(SELECTOR.LOTTO_ICON);
  });

  it('로또를 구입한 후, 아이콘의 갯수가 구입 금액에 맞게 발행됐는지 확인한다.', () => {
    typing(SELECTOR.PRICE_FORM, 5_000);
    click(SELECTOR.PRICE_BUTTON);
    hasValidLength(SELECTOR.LOTTO_ICON, 5);
  });

  it('로또를 구입한 후 번호 보기를 누르면 로또 번호를 확인할 수 있다.', () => {
    typing(SELECTOR.PRICE_FORM, 5_000);
    click(SELECTOR.PRICE_BUTTON);
    check(SELECTOR.LOTTO_SWITCH);
    isVisible(SELECTOR.LOTTO_CANDIDATE);
  });

  it('다시 check를 누를 경우 번호가 다시 사라진다.', () => {
    typing(SELECTOR.PRICE_FORM, 5_000);
    click(SELECTOR.PRICE_BUTTON);
    check(SELECTOR.LOTTO_SWITCH);
    uncheck(SELECTOR.LOTTO_SWITCH);
    cy.get(SELECTOR.LOTTO_CANDIDATE).should('not.be.visible');
  });

  it('각 로또당 6개의 번호가 있다.', () => {
    typing(SELECTOR.PRICE_FORM, 5_000);
    click(SELECTOR.PRICE_BUTTON);
    check(SELECTOR.LOTTO_SWITCH);
    cy.get(SELECTOR.LOTTO_CANDIDATE).each(($el) => {
      const lottoNumbers = $el.text().split(',');
      expect(lottoNumbers).to.have.length(6);
    });
  });

  it('로또 번호들의 범위가 1~45인지 확인한다', () => {
    typing(SELECTOR.PRICE_FORM, 5_000);
    click(SELECTOR.PRICE_BUTTON);
    check(SELECTOR.LOTTO_SWITCH);
    cy.get(SELECTOR.LOTTO_CANDIDATE).each(($el) => {
      const lottoNumbers = $el.text().split(',').map(Number);
      lottoNumbers.forEach((number) => {
        expect(number).to.be.within(1, 45);
      });
    });
  });

  it('각 로또의 번호는 중복되지 않는다.', () => {
    typing(SELECTOR.PRICE_FORM, 5_000);
    click(SELECTOR.PRICE_BUTTON);
    check(SELECTOR.LOTTO_SWITCH);
    cy.get(SELECTOR.LOTTO_CANDIDATE).each(($el) => {
      const lottoNumbers = $el.text().split(',').map(Number);
      const uniqueNumbers = [...new Set(lottoNumbers)];
      expect(lottoNumbers).to.have.length(uniqueNumbers.length);
    });
  });

  it.only('각 로또의 번호는 오름차순으로 정렬되어 있다.', () => {
    typing(SELECTOR.PRICE_FORM, 5_000);
    click(SELECTOR.PRICE_BUTTON);
    check(SELECTOR.LOTTO_SWITCH);
    cy.get(SELECTOR.LOTTO_CANDIDATE).each(($el) => {
      const lottoNumbers = $el.text().split(',').map(Number);
      const sortedNumbers = lottoNumbers.sort((a, b) => a - b);
      expect(lottoNumbers).to.deep.equal(sortedNumbers);
    });
  });
});
