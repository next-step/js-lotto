/// <reference types="Cypress" />

import {
  NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT,
  NOT_UPPER_THAN_LOWER_LIMIT,
  NOT_LOWER_THAN_UPPER_LIMIT,
  PRICE,
  NOT_ALL_NUMBERS_INPUT,
  NOT_ALL_NUMBERS_UPPER_THAN_MIN_NUMBER,
  NOT_ALL_NUMBERS_LOWER_THAN_MAX_NUMBER,
  NUMBERS_COUNT,
  WINNING_NUMBER_INPUT_COUNT,
  MOCKED_MONEY,
  LOWEST_MONEY_LIMIT,
  HIGHEST_MONEY_LIMIT,
  MAX_NUMBER,
  MIN_NUMBER,
  SAME_NUMBER,
  NOT_ALL_NUMBERS_UNIQUE,
  MOCKED_NUMBER,
  EACH,
  NO_WIN_RATE_OF_RETURN,
  ONE_FIRST_PLACE_RATE_OF_RETURN,
  SELECTORS,
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
    typing(SELECTORS.MONEY_INPUT_SELECTOR, money);
    clickButton(SELECTORS.MONEY_INPUT_BUTTON_SELECTOR);
  };
  const randomNumber = () =>
    Math.trunc(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);

  beforeEach(() => cy.visit('/'));

  context('초기 화면 테스트', () => {
    it('로또 어플리케이션이 존재해야한다.', () => {
      checkVisible('#app');
    });

    it('첫 시작시 화면은 타이틀, 금액 입력 안내문, 금액 입력창과 제출 버튼으로 이루어져 있다.', () => {
      checkVisibles([
        SELECTORS.TITLE_SELECTOR,
        SELECTORS.MONEY_INPUT_SELECTOR,
        SELECTORS.MONEY_INPUT_BUTTON_SELECTOR,
      ]);
    });
  });

  context('구입 금액 입력 테스트', () => {
    it('제출된 금액이 1,000원 단위가 아니면 경고창을 출력한 후 금액 입력창을 초기화한다.', () => {
      purchaseTickets(PRICE + 1);
      checkAlert(NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT);
      checkValue(SELECTORS.MONEY_INPUT_SELECTOR, '');
    });

    it('제출된 금액이 1,000원을 넘지 않으면 경고창을 출력한 후 금액 입력창을 초기화한다.', () => {
      purchaseTickets(LOWEST_MONEY_LIMIT - 1);
      checkAlert(NOT_UPPER_THAN_LOWER_LIMIT);
      checkValue(SELECTORS.MONEY_INPUT_SELECTOR, '');
    });

    it('제출된 금액이 100,000원을 넘으면 경고창을 출력한 후 금액 입력창을 초기화한다.', () => {
      purchaseTickets(HIGHEST_MONEY_LIMIT + 1);
      checkAlert(NOT_LOWER_THAN_UPPER_LIMIT);
      checkValue(SELECTORS.MONEY_INPUT_SELECTOR, '');
    });
  });

  context('로또 자동구매 테스트', () => {
    beforeEach(() => {
      purchaseTickets(MOCKED_MONEY);
    });

    it('금액이 제출되면, 금액에 해당하는 로또(1,000원 당 1개)들이 발급되었다는 안내문을 노출한다.', () => {
      cy.get(SELECTORS.TICKET_NOTICE_SELECTOR).should(
        'have.text',
        `총 ${MOCKED_MONEY / PRICE}개를 구매하였습니다.`
      );
    });

    it('금액이 제출되면, 금액에 해당하는 로또(1,000원 당 1개)들을 발급해야 한다.', () => {
      cy.get(SELECTORS.TICKET_SELECTOR).should(
        'have.length',
        MOCKED_MONEY / PRICE
      );
    });

    it('발급된 로또들은 번호 미노출 상태여야한다.', () => {
      cy.get(SELECTORS.TICKET_NUMBERS_SELECTOR).should('not.exist');
    });

    it('번호보기 토글을 클릭하여 번호 미노출/노출 상태를 정할 수 있다.', () => {
      clickButton(SELECTORS.TICKET_TOGGLE_BUTTON_SELECTOR);
      cy.get(SELECTORS.TICKET_NUMBERS_SELECTOR).should(
        'have.length',
        MOCKED_MONEY / PRICE
      );

      clickButton(SELECTORS.TICKET_TOGGLE_BUTTON_SELECTOR);
      cy.get(SELECTORS.TICKET_NUMBERS_SELECTOR).should('not.exist');
    });

    it('번호보기 기능으로 노출되는 번호는 로또 각각 6개이다.', () => {
      clickButton(SELECTORS.TICKET_TOGGLE_BUTTON_SELECTOR);
      cy.get(SELECTORS.TICKET_NUMBERS_SELECTOR)
        .invoke('text')
        .then((text) => text.split(', ').length === NUMBERS_COUNT);
    });
  });

  context('당첨 번호 및 보너스 번호 입력 테스트', () => {
    beforeEach(() => {
      purchaseTickets(MOCKED_MONEY);
    });

    it('금액이 제출되면, 당첨 번호를 입력할 수 있는 6개의 입력창과 보너스 번호를 입력할 수 있는 1개의 입력창을 노출한다.', () => {
      cy.get(SELECTORS.WINNING_NUMBER_SELECTOR)
        .should('have.length', WINNING_NUMBER_INPUT_COUNT)
        .should('be.visible');

      checkVisible(SELECTORS.BONUS_NUMBER_SELECTOR);
    });

    it('6개의 당첨 번호 입력창 중 값이 입력되지 않은 입력창이 있는 상태에서 결과를 확인하면 경고창을 출력한다.', () => {
      cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
        [...inputs].forEach((input, index) => {
          if (index !== 2) cy.wrap(input).type((index + 1) * 3);
        });
      });
      typing(SELECTORS.BONUS_NUMBER_SELECTOR, MOCKED_NUMBER);

      checkAlert(NOT_ALL_NUMBERS_INPUT);
      cy.get(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR).click();
    });

    it('보너스 번호 입력창에 값이 입력되지 않은 상태에서 결과를 확인하면 경고창을 출력한다.', () => {
      checkAlert(NOT_ALL_NUMBERS_INPUT);
      cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
        [...inputs].forEach((input, index) =>
          cy.wrap(input).type((index + 1) * 3)
        );
      });

      cy.get(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR).click();
    });

    it('6개의 당첨 번호 입력창 중 1 미만인 값이 입력된 입력창이 있는 상태에서 결과를 확인하면 경고창을 출력한다.', () => {
      checkAlert(NOT_ALL_NUMBERS_UPPER_THAN_MIN_NUMBER);
      cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
        [...inputs].forEach((input, index) =>
          cy.wrap(input).type(index === 3 ? MIN_NUMBER - 2 : (index + 1) * 3)
        );
      });
      typing(SELECTORS.BONUS_NUMBER_SELECTOR, MOCKED_NUMBER);

      cy.get(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR).click();
    });

    it('보너스 번호 입력창에 1 미만인 값이 입력된 상태에서 결과를 확인하면 경고창을 출력한다.', () => {
      checkAlert(NOT_ALL_NUMBERS_UPPER_THAN_MIN_NUMBER);
      cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
        [...inputs].forEach((input, index) =>
          cy.wrap(input).type((index + 1) * 3)
        );
      });
      typing(SELECTORS.BONUS_NUMBER_SELECTOR, MIN_NUMBER - 2);

      cy.get(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR).click();
    });

    it('6개의 당첨 번호 입력창 중 45 초과인 값이 입력된 입력창이 있는 상태에서 결과를 확인하면 경고창을 출력한다.', () => {
      checkAlert(NOT_ALL_NUMBERS_LOWER_THAN_MAX_NUMBER);
      cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
        [...inputs].forEach((input, index) =>
          cy.wrap(input).type(index === 3 ? MAX_NUMBER + 1 : (index + 1) * 3)
        );
      });
      typing(SELECTORS.BONUS_NUMBER_SELECTOR, MOCKED_NUMBER);

      cy.get(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR).click();
    });

    it('보너스 번호 입력창에 45 초과인 값이 입력된 상태에서 결과를 확인하면 경고창을 출력한다.', () => {
      checkAlert(NOT_ALL_NUMBERS_LOWER_THAN_MAX_NUMBER);
      cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
        [...inputs].forEach((input, index) =>
          cy.wrap(input).type((index + 1) * 3)
        );
      });
      typing(SELECTORS.BONUS_NUMBER_SELECTOR, MAX_NUMBER + 1);

      cy.get(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR).click();
    });

    it('6개의 당첨 번호 입력창과 1개의 보너스 번호 입력창의 입력 값들은 1이상 45이하의 고유한 값이 입력되지않은 상태에서 결과를 확인하면 경고창을 출력한다.', () => {
      checkAlert(NOT_ALL_NUMBERS_UNIQUE);
      cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
        [...inputs].forEach((input) => cy.wrap(input).type(SAME_NUMBER));
      });
      typing(SELECTORS.BONUS_NUMBER_SELECTOR, SAME_NUMBER);

      cy.get(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR).click();
    });
  });

  context('결과 확인 테스트', () => {
    beforeEach(() => {
      purchaseTickets(MOCKED_MONEY);
    });

    it('당첨된 로또가 없으면 당첨 갯수는 모두 0개이고 총 수익률은 -100%이다.', () => {
      clickButton(SELECTORS.TICKET_TOGGLE_BUTTON_SELECTOR);
      cy.get(SELECTORS.TICKET_NUMBERS_SELECTOR)
        .invoke('text')
        .then((text) => text.split(', '))
        .then((ticketNumbers) => {
          const numbers = new Set(ticketNumbers);

          cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
            [...inputs].forEach((input) => {
              while (true) {
                const number = String(randomNumber());

                if (!numbers.has(number)) {
                  numbers.add(number);
                  cy.wrap(input).type(number);

                  break;
                }
              }
            });
          });

          cy.get(SELECTORS.BONUS_NUMBER_SELECTOR).then((input) => {
            while (true) {
              const number = String(randomNumber());

              if (!numbers.has(number)) {
                numbers.add(number);
                cy.wrap(input).type(number);

                break;
              }
            }
          });

          clickButton(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR);

          cy.get(SELECTORS.WINNING_COUNT_SELECTOR)
            .invoke('text')
            .then((text) => expect(text.split(EACH).every((count) => !!count)));

          cy.get(SELECTORS.RATE_OF_RETURN_SELECTOR)
            .invoke('text')
            .then((text) =>
              expect(text).to.contains(
                `당신의 총 수익률은 ${NO_WIN_RATE_OF_RETURN} 입니다.`
              )
            );
        });
    });

    it('당첨된 로또가 있으면 당첨 갯수와 수익률을 노출한다.', () => {
      clickButton(SELECTORS.TICKET_TOGGLE_BUTTON_SELECTOR);
      cy.get(SELECTORS.TICKET_NUMBERS_SELECTOR)
        .invoke('text')
        .then((text) => text.split(', '))
        .then((ticketNumbers) => {
          cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
            [...inputs].forEach((input, index) =>
              cy.wrap(input).type(ticketNumbers[index])
            );
          });

          cy.get(SELECTORS.BONUS_NUMBER_SELECTOR).then((input) => {
            while (true) {
              const number = String(randomNumber());

              if (!ticketNumbers.includes(number)) {
                cy.wrap(input).type(number);

                break;
              }
            }
          });

          clickButton(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR);

          cy.get(SELECTORS.WINNING_COUNT_SELECTOR)
            .invoke('text')
            .then((text) => text.split(EACH))
            .then((counts) => expect(counts[NUMBERS_COUNT - 1]) === '1');

          cy.get(SELECTORS.RATE_OF_RETURN_SELECTOR)
            .invoke('text')
            .then((text) =>
              expect(text).to.contains(
                `당신의 총 수익률은 ${ONE_FIRST_PLACE_RATE_OF_RETURN} 입니다.`
              )
            );
        });
    });

    it('다시 시작하기 버튼을 누르면 첫 시작으로 돌아가고 화면은 타이틀, 금액 입력 안내문, 금액 입력창과 제출 버튼으로 이루어져 있다.', () => {
      clickButton(SELECTORS.TICKET_TOGGLE_BUTTON_SELECTOR);
      cy.get(SELECTORS.TICKET_NUMBERS_SELECTOR)
        .invoke('text')
        .then((text) => text.split(', '))
        .then((ticketNumbers) => {
          cy.get(SELECTORS.WINNING_NUMBER_SELECTOR).then((inputs) => {
            [...inputs].forEach((input, index) =>
              cy.wrap(input).type(ticketNumbers[index])
            );
          });

          cy.get(SELECTORS.BONUS_NUMBER_SELECTOR).then((input) => {
            while (true) {
              const number = String(randomNumber());

              if (!ticketNumbers.includes(number)) {
                cy.wrap(input).type(number);

                break;
              }
            }
          });

          clickButton(SELECTORS.OPEN_RESULT_MODAL_BUTTON_SELECTOR);
          clickButton(SELECTORS.RESTART_BUTTON_SELECTOR);
          checkVisibles([
            SELECTORS.TITLE_SELECTOR,
            SELECTORS.MONEY_INPUT_SELECTOR,
            SELECTORS.MONEY_INPUT_BUTTON_SELECTOR,
          ]);
        });
    });
  });
});
