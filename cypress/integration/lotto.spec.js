import {DOM_ID, LOTTO_PRICE} from "../../src/js/constants";

const BASE_URL = 'http://127.0.0.1:8080/';

const typeAndClick = (typeEl, text, clickEl) => {
  cy.get(typeEl).type(text);
  cy.get(clickEl).click();
}

describe('lotto-step1', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });
  const money = 15000;

  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    typeAndClick(DOM_ID.MONEY_INPUT, money, DOM_ID.PURCHASE_BUTTON);
    cy.get(DOM_ID.PURCHASE_MESSAGE).invoke('text').should('eq', `총 ${String(money / LOTTO_PRICE)}개를 구매하였습니다.`);
  });

  it('토글 버튼을 누르지 않으면 발급된 로또가 보이지 않는다.', () => {
    typeAndClick(DOM_ID.MONEY_INPUT, money, DOM_ID.PURCHASE_BUTTON);
    cy.get(DOM_ID.LOTTO_LIST).children().find('#lottoDetail').
    first().invoke('attr', 'style', 'display: none')
    .should('have.attr', 'style', 'display: none');
  });

  it('토글 버튼을 누르면 발급된 로또가 보인다', () => {
    typeAndClick(DOM_ID.MONEY_INPUT, money, DOM_ID.PURCHASE_BUTTON);
    cy.get(DOM_ID.PURCHASE_BUTTON).check();
    cy.get(DOM_ID.LOTTO_LIST).children().find('#lottoDetail').
    first().invoke('attr', 'style', 'display: none')
    .should('have.attr', 'style', 'display: inline');
  });
});