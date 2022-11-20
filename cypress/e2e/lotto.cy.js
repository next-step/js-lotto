const inputSelector = "[data-cy='purchase-amount']";
const buttonSelector = "[data-cy='purchase-button']";
const numbersSelector = "[data-cy='purchase-numbers']";
const iconSelector = "[data-cy='lotto-icon']";
const toggleSelector = '.switch';
const lottoNumberSelector = '.lotto-number';

const winnngNumberSelector = '.winning-number';
const bonusNumberSelector = '.bonus-number';
const resultButtonSelector = "[data-cy='lotto-result-button']";
const modalSelector = '.modal';

const INVALID_ERROR_MESSAGE = '1,000원 단위로 입력하세요.';
const REQUIRED_ERROR_MESSAGE = '금액을 입력하세요.';
const EMPTY_RANGE_ERROR_MESSAGE = '1에서 45 사이의 당첨 번호를 입력하세요.';
const DUPLICATED_ERROR_MESSAGE =
  '당첨 번호와 보너스 번호 모두 중복 입력은 불가합니다.';

describe('로또를 구매한다', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('금액을 입력할 input 태그가 있다', () => {
    cy.get(inputSelector).should('exist');
  });

  it('금액은 숫자로 입력할 수 있다', () => {
    cy.get(inputSelector).type('1000');
    cy.get(inputSelector).should('have.value', '1000');
  });

  it('금액은 숫자만 입력가능하다', () => {
    cy.wrap(['1000abc', 'abc', '!!'])
      .each((typeValue, i, array) => {
        cy.get(inputSelector).type(typeValue);
      })
      .then(() => {
        cy.get(inputSelector).should('have.value', '1000');
      });
  });

  it('클릭할 수 있는 확인 버튼이 있다', () => {
    cy.get(buttonSelector).should('exist');
    cy.get(buttonSelector).click();
  });

  it('금액을 입력하지 않은 경우 alert를 띄어준다', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get(buttonSelector)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(REQUIRED_ERROR_MESSAGE);
      });
  });

  it('1,000원 단위로 입력하지 않은 경우 alert를 띄어준다.', () => {
    cy.get(inputSelector).type('1500');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get(buttonSelector)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(INVALID_ERROR_MESSAGE);
      });
  });

  it('금액을 음수로 입력한 경우 alert를 띄어준다.', () => {
    cy.get(inputSelector).type('-1000');
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get(buttonSelector)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(INVALID_ERROR_MESSAGE);
      });
  });

  it('구입할 금액을 입력하고 확인 버튼을 누르면 금액에 해당하는 로또 개수와 아이콘을 표시한다.', () => {
    cy.get(inputSelector).type('3000');
    cy.get(buttonSelector).click();

    cy.get(numbersSelector).contains('3');
    cy.get(iconSelector).should('have.length', 3);
  });

  it('로또 발급 후에는 번호보기 토글 버튼이 존재한다', () => {
    cy.get(inputSelector).type('3000');
    cy.get(buttonSelector).click();
    cy.get(toggleSelector).should('exist');
  });

  it('로또 발급 후에는 번호보기 토글 버튼이 OFF 상태이다', () => {
    cy.get(inputSelector).type('3000');
    cy.get(buttonSelector).click();
    cy.get(toggleSelector).should('not.be.checked');
  });

  it('번호보기 토글을 ON하면 복권 번호가 각각 표시된다', () => {
    cy.get(inputSelector).type('3000');
    cy.get(buttonSelector).click();
    cy.get(toggleSelector).click();
    cy.get(lottoNumberSelector).should('be.visible');
  });

  it('번호보기 토글을 OFF하면 복권 번호가 사라진다', () => {
    cy.get(inputSelector).type('3000');
    cy.get(buttonSelector).click();
    cy.get(toggleSelector).click();
    cy.get(toggleSelector).click();

    cy.get(lottoNumberSelector).should('not.be.visible');
  });
});

describe('당첨 결과를 확인한다', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
    cy.get(inputSelector).type('3000');
    cy.get(buttonSelector).click();
  });

  it('결과 확인 버튼이 있고 클릭할 수 있다', () => {
    cy.get(resultButtonSelector).should('exist');
    cy.get(resultButtonSelector).click();
  });

  it('당첨 번호는 빈 값이면 alert를 띄어준다', () => {
    cy.get(resultButtonSelector).click();

    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get(winnngNumberSelector).each(($el, index, $list) => {
      expect(stub.getCall(0)).to.be.calledWith(EMPTY_RANGE_ERROR_MESSAGE);
    });
  });

  it('보너스 번호는 빈 값이면 alert를 띄어준다.', () => {
    cy.get(resultButtonSelector).click();

    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get(bonusNumberSelector).each(($el, index, $list) => {
      expect(stub.getCall(0)).to.be.calledWith(EMPTY_RANGE_ERROR_MESSAGE);
    });
  });

  it('당첨번호는 1보다 작거나 45보다 크면 alert를 띄어준다', () => {
    cy.get(winnngNumberSelector)
      .each(($el, index, $list) => {
        cy.wrap($el).type(0);
      })
      .then(() => {
        cy.get(resultButtonSelector).click();
      });

    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get(winnngNumberSelector).each(($el, index, $list) => {
      expect(stub.getCall(0)).to.be.calledWith(EMPTY_RANGE_ERROR_MESSAGE);
    });
  });

  it('보너스 번호는 1보다 작거나 45보다 크면 alert를 띄어준다', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.wrap([-11, 45]).each((num, index, list) => {
      cy.get(bonusNumberSelector).clear();
      cy.get(resultButtonSelector)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(EMPTY_RANGE_ERROR_MESSAGE);
        });
    });
  });

  it('당첨 번호와 보너스 번호 모두 중복이 불가능하다', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get(winnngNumberSelector).each(($el, index, $list) => {
      cy.wrap($el).type(index + 1);
    });
    cy.get(bonusNumberSelector).type(5);
    cy.get(resultButtonSelector)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(DUPLICATED_ERROR_MESSAGE);
      });
  });

  it('결과 확인 버튼을 클릭하면 모달이 열린다', () => {
    cy.get(winnngNumberSelector).each(($el, index, $list) => {
      cy.wrap($el).type(index + 1);
    });
    cy.get(bonusNumberSelector).type(8);
    cy.get(resultButtonSelector).click();
    cy.get(modalSelector).should('have.class', 'open');
  });
});
