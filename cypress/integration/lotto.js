import { ERROR_MESSAGES } from '../../src/js/utils/constant.js';

describe('로또 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('');
  });

  //   describe('# 로또 구입 금액을 입력한다.', () => {
  //     it('로또 구입 금액 입력할 input 태그가 있다.', () => {
  //       cy.getDataset('purchase-price-input').should('exist');
  //     });

  //     it('로또 구입 금액을 입력하면 그대로 보여진다.', () => {
  //       cy.getDataset('purchase-price-input').type('1000');
  //       cy.getDataset('purchase-price-input').should('have.value', '1000');
  //     });

  //     it('금액은 숫자만 입력된다.', () => {
  //       cy.getDataset('purchase-price-input').type('ab가갸1cd000거겨');
  //       cy.getDataset('purchase-price-input').should('have.value', '1000');
  //     });
  //   });

  //   describe('# 금액에 해당하는 로또를 발급해야 한다.', () => {
  //     it('금액 입력란과 확인 버튼이 존재한다.', () => {
  //       cy.getDataset('purchase-price-input').should('exist');
  //       cy.getDataset('purchase-price-button').should('exist');
  //     });

  //     it('금액에 맞는 로또 개수를 발급한다.', () => {
  //       cy.purchaseLotto('1000');
  //       cy.getDataset('total-purchase').should('have.text', '1');
  //     });

  //     it('엔터를 누르면 로또가 발급된다.', () => {
  //       cy.getDataset('purchase-price-input').type('1000{enter}');
  //       cy.getDataset('total-purchase').should('have.text', '1');
  //     });

  //     it('로또 아이콘이 개수에 맞게 나타난다.', () => {
  //       cy.purchaseLotto('10000');
  //       cy.getDataset('ticket-icon').should('have.length', 10);
  //     });
  //   });

  //   describe('# 로또 1장의 가격은 1,000원이다.', () => {
  //     it('금액이 음수일 경우 alert을 띄워준다.', () => {
  //       cy.purchaseLotto('-1000');
  //       cy.on('window:alert', t => {
  //         expect(t).to.equal(ERROR_MESSAGES.CANNOT_NEGATIVE_PRICE);
  //       });
  //     });

  //     it('금액이 1000원 단위로 입력이 되지 않았을 경우 alert을 띄워준다.', () => {
  //       cy.purchaseLotto('1111');
  //       cy.on('window:alert', t => {
  //         expect(t).to.equal(ERROR_MESSAGES.INCORRECT_UNIT_OF_PRICE);
  //       });
  //     });

  //     it('금액이 쵀대 금액을 넘을경우 alert을 띄워준다.', () => {
  //       cy.purchaseLotto('1000000');
  //       cy.on('window:alert', t => {
  //         expect(t).to.equal(ERROR_MESSAGES.EXCEED_PRICE);
  //       });
  //     });
  //   });

  //   describe('# 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
  //     it('번호보기 토글 버튼이 있다.', () => {
  //       cy.purchaseLotto('1000');
  //       cy.getDataset('toggle-number-button').should('exist');
  //     });

  //     it('토글이 활성화되면 번호가 나타난다.', () => {
  //       cy.purchaseLotto('10000');
  //       cy.getDataset('toggle-number-button').check({ force: true });
  //       cy.getDataset('lotto-numbers').should('exist');
  //     });

  //     it('토글이 비활성화되면 번호가 사라진다.', () => {
  //       cy.purchaseLotto('10000');
  //       cy.getDataset('toggle-number-button').check({ force: true });
  //       cy.getDataset('toggle-number-button').uncheck({ force: true });
  //       cy.getDataset('lotto-numbers').should('not.exist');
  //     });
  //   });

  const typeWinningNumbers = numbers => {
    cy.getDataset('winning-number').each((number, index) => {
      cy.wrap(number).type(numbers[index]);
    });

    const bonusNumber = numbers[numbers.length - 1];
    cy.getDataset('bonus-number').type(bonusNumber);
  };

  describe('# 당첨 번호는 중복되지 않는 7개의 1이상 45이하의 숫자이다.', () => {
    beforeEach(() => {
      cy.purchaseLotto('10000');
    });

    it('당첨 번호 6개와 보너스 번호 1, 총 7개의 input이 있다.', () => {
      cy.getDataset('winning-number').should('have.length', 6);
      cy.getDataset('bonus-number').should('have.length', 1);
    });

    it('로또 번호에 중복된 숫자를 입력시 alert이 뜬다.', () => {
      cy.typeWinningNumbers([1, 1, 1, 2, 2, 6, 2]);
      cy.getDataset('result-btn').click();
      cy.on('window:alert', t => {
        expect(t).to.equal(ERROR_MESSAGES.NOT_UNIQUE_WINNING_NUMBER);
      });
    });

    it('로또 번호에 숫자가 아닐시 input값 안에 입력되지 않는다.', () => {
      cy.typeWinningNumbers(['가', '나', 'abc', '!!', '!@#', '라', 'e']);
      cy.getDataset('winning-number').each(number => {
        cy.wrap(number).should('have.text', '');
      });
    });

    it('로또 번호가 1~45 사이의 수가 아닐시 alert이 뜬다.', () => {
      cy.typeWinningNumbers([-1, 100, 46, 4, -3, 0, 66]);
      cy.getDataset('result-btn').click();
      cy.on('window:alert', t => {
        expect(t).to.equal(ERROR_MESSAGES.INVALID_WINNING_NUMBER);
      });
    });

    it('7개의 수를 모두 입력해야 결과를 확인할 수 있다.', () => {
      cy.typeWinningNumbers([1, 2, 3, 4, 5, 6, 7]);
      cy.getDataset('result-btn').click();
      // 모달 띄우기
    });
  });
});
