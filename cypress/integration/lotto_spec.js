/// <reference types="Cypress" />

import {
  NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT,
  NOT_UPPER_THAN_LOWER_LIMIT,
  NOT_LOWER_THAN_UPPER_LIMIT,
  TITLE_SELECTOR,
  TICKET_SELECTOR,
  MONEY_INPUT_SELECTOR,
  TICKET_NOTICE_SELECTOR,
  MONEY_INPUT_BUTTON_SELECTOR,
  TICKET_NUMBERS_SELECTOR,
  TICKET_TOGGLE_BUTTON_SELECTOR,
  PRICE,
} from '../../src/js/constants/index.js';

describe('로또 테스트', () => {
  const clickButton = (selector) => cy.get(selector).click();
  const checkVisible = (selector) => cy.get(selector).should('be.visible');
  const checkVisibles = (selectors) =>
    selectors.forEach((selector) => {
      checkVisible(selector);
    });
  const checkValue = (selector, expectedValue) =>
    cy.get(selector).should('have.value', expectedValue);
  const typing = (selector, text) => {
    cy.get(selector).type(text);
  };
  const checkAlert = (expectedText) => {
    cy.on('window:alert', (text) => {
      expect(text).to.contains(expectedText);
    });
  };
  const purchaseTickets = (money) => {
    typing(MONEY_INPUT_SELECTOR, money);
    clickButton(MONEY_INPUT_BUTTON_SELECTOR);
  };

  beforeEach(() => {
    cy.visit('/');
  });

  context('초기 화면 테스트', () => {
    it('로또 어플리케이션이 존재해야한다.', () => {
      checkVisible('#app');
    });

    it('첫 시작시 화면은 타이틀, 금액 입력 안내문, 금액 입력창과 제출 버튼으로 이루어져 있다.', () => {
      checkVisibles([
        TITLE_SELECTOR,
        MONEY_INPUT_SELECTOR,
        MONEY_INPUT_BUTTON_SELECTOR,
      ]);
    });
  });

  context('구입 금액 입력 테스트', () => {
    it('제출된 금액이 1,000원 단위가 아니면 경고 alert을 출력한 후 금액 입력창을 초기화한다.', () => {
      typing(MONEY_INPUT_SELECTOR, '1001');
      clickButton(MONEY_INPUT_BUTTON_SELECTOR);
      checkAlert(NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT);
      checkValue(MONEY_INPUT_SELECTOR, '');
    });

    it('제출된 금액이 1,000원을 넘지 않으면 경고 alert을 출력한 후 금액 입력창을 초기화한다.', () => {
      typing(MONEY_INPUT_SELECTOR, '999');
      clickButton(MONEY_INPUT_BUTTON_SELECTOR);
      checkAlert(NOT_UPPER_THAN_LOWER_LIMIT);
      checkValue(MONEY_INPUT_SELECTOR, '');
    });

    it('제출된 금액이 100,000원을 넘으면 경고 alert을 출력한 후 금액 입력창을 초기화한다.', () => {
      typing(MONEY_INPUT_SELECTOR, '100001');
      clickButton(MONEY_INPUT_BUTTON_SELECTOR);
      checkAlert(NOT_LOWER_THAN_UPPER_LIMIT);
      checkValue(MONEY_INPUT_SELECTOR, '');
    });
  });

  context('로또 자동구매 테스트', () => {
    const MOCKED_MONEY = 5000;

    beforeEach(() => {
      purchaseTickets(MOCKED_MONEY);
    });

    it('금액이 제출되면, 금액에 해당하는 로또(1,000원 당 1개)들이 발급되었다는 안내문을 노출한다.', () => {
      cy.get(TICKET_NOTICE_SELECTOR).should(
        'have.text',
        `총 ${MOCKED_MONEY / PRICE}개를 구매하였습니다.`
      );
    });

    it('금액이 제출되면, 금액에 해당하는 로또(1,000원 당 1개)들을 발급해야 한다.', () => {
      cy.get(TICKET_SELECTOR).should('have.length', MOCKED_MONEY / PRICE);
    });

    it('발급된 로또들은 번호 미노출 상태여야한다.', () => {
      cy.get(TICKET_NUMBERS_SELECTOR).should('not.exist');
    });

    it('번호보기 토글을 클릭하여 번호 미노출/노출 상태를 정할 수 있다.', () => {
      clickButton(TICKET_TOGGLE_BUTTON_SELECTOR);
      cy.get(TICKET_NUMBERS_SELECTOR).should(
        'have.length',
        MOCKED_MONEY / PRICE
      );

      clickButton(TICKET_TOGGLE_BUTTON_SELECTOR);
      cy.get(TICKET_NUMBERS_SELECTOR).should('not.exist');
    });

    it('번호보기 기능으로 노출되는 번호는 로또 각각 6개이다.', () => {
      clickButton(TICKET_TOGGLE_BUTTON_SELECTOR);
      cy.get(TICKET_NUMBERS_SELECTOR)
        .invoke('text')
        .then((text) => text.split(', ').length === 6);
    });
  });
});
