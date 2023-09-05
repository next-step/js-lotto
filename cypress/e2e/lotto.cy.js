const SELECTOR = Object.freeze({
  PRICE_FORM: '#purchase-amount-form',
  PRICE_BUTTON: '#purchase-amount__button',
  LOTTO_ICON: '[data-ticket="purchase-lottos__ticket"]',
  LOTTO_SWITCH: '#lotto-numbers-toggle-button',
  LOTTO_CANDIDATE: '[data-candidate="lotto-candidate"]',
  ANSWERS_FORM: '#lotto-answers-form',
  WINNING_NUMBER: '[data-winning="winning-number"]',
  BONUS_NUMBER: '#bonus-number',
  RESULT_BUTTON: '.open-result-modal-button',
  MODAL: '.modal',
  RESTART_BUTTON: '#restart-button',
  PURCHASE_AMOUNT_INPUT: '#purchase-amount__input',
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

describe('로또 당첨 번호 및 보너스 번호 지정, 당첨 통계 확인', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
    typing(SELECTOR.PRICE_FORM, 5_000);
    click(SELECTOR.PRICE_BUTTON);
    check(SELECTOR.LOTTO_SWITCH);
  });

  it('로또 당첨 번호 입력 폼이 있는지 확인한다.', () => {
    isVisible(SELECTOR.ANSWERS_FORM);
  });

  it('로또 당첨 번호 입력 6개와 보너스 번호 입력 1개 폼이 있는지 확인한다.', () => {
    cy.get(SELECTOR.WINNING_NUMBER).should(($el) => {
      expect($el).to.have.length(6);
    });

    isVisible(SELECTOR.BONUS_NUMBER);
  });

  it('입력한 로또 당첨 번호 6개, 보너스 번호 1개가 1~45인지 확인한다.', () => {
    cy.get(SELECTOR.WINNING_NUMBER).each(($el, idx) => {
      typing($el, idx + 1);
      expect(idx + 1).to.be.within(1, 45);
    });

    typing(SELECTOR.BONUS_NUMBER, 7);
    expect(7).to.be.within(1, 45);
  });

  it('입력한 로또 당첨 번호 6개, 보너스 번호 1개는 중복되지 않는다.', () => {
    const winningNumbersWithBonusNumber = [];

    cy.get(SELECTOR.WINNING_NUMBER).each(($el, idx) => {
      typing($el, idx + 1);
    });
    cy.get(SELECTOR.WINNING_NUMBER).each(($el) => {
      const winningNumber = Number($el.text());
      winningNumbersWithBonusNumber.push(winningNumber);
    });

    typing(SELECTOR.BONUS_NUMBER, 7);
    winningNumbersWithBonusNumber.push(7);

    const uniqueNumbers = [...new Set(winningNumbersWithBonusNumber)];
    expect(winningNumbersWithBonusNumber).to.have.length(uniqueNumbers.length);
  });

  it('로또 당첨 번호 6개, 보너스 번호 1개를 입력하고 결과 확인하기 버튼을 누르면 통계 모달이 나온다.', () => {
    cy.get(SELECTOR.WINNING_NUMBER).each(($el, idx) => {
      typing($el, idx + 1);
    });
    typing(SELECTOR.BONUS_NUMBER, 7);
    click(SELECTOR.RESULT_BUTTON);

    isVisible(SELECTOR.MODAL);
  });

  it('통계 모달이 나왔을 때 다시 시작하기 버튼을 누르면 모달이 꺼지고 초기 상태로 돌아간다.', () => {
    cy.get(SELECTOR.WINNING_NUMBER).each(($el, idx) => {
      typing($el, idx + 1);
    });
    typing(SELECTOR.BONUS_NUMBER, 7);
    click(SELECTOR.RESULT_BUTTON);

    click(SELECTOR.RESTART_BUTTON);
    cy.get(SELECTOR.MODAL).should('not.be.visible');
    cy.get(SELECTOR.PURCHASE_AMOUNT_INPUT).then(($el) => {
      const value = $el.text();
      expect(value).to.have.length(0);
    });
  });
});
