/// <reference types="cypress" />

describe('App', () => {
  describe('App initiation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5500/')
    });

    it('앱이 시작되면 구입금액 입력창만 보여야 한다.', () => {
      cy.get('[data-test-id="lotto-purchase"]').should('be.visible');
      cy.get('[data-test-id="lotto-list"]').should('not.be.visible');
      cy.get('[data-test-id="lotto-input"]').should('not.be.visible');
      cy.get('[data-test-id="modal"]').should('not.be.visible');
    });
  });

  describe('purchase Lotto', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5500/')
    });

    it('로또 구입 금액을 입력하면 금액에 해당하는 로또를 발급해야 하고 내 로또 입력창이 나와야한다.', () => {
      const lottoPurchase = cy.get('[data-test-id="lotto-purchase"]');
      const lottoPurchaseInput = cy.get('[data-test-id="lotto-purchase-input"]');
      const lottoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button"]');
      lottoPurchase.should('be.visible');
      lottoPurchaseInput.type('10000');
      lottoPurchaseButton.click();

      cy.get('[data-test-id="lotto-list"]').should('be.visible');
      cy.get('[data-test-id="lotto-input"]').should('be.visible');
      cy.get('[data-test-id="lotto-table"]').children().children().should('have.length', 10);
    });

    it('로또 구입 금액은 1000원 단위만 가능하고 다른 값 입력시 경고창을 띄운다.', () => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal('구입 가격은 1000 단위로만 입력해주세요!');
      });

      const lottoPurchaseInput = cy.get('[data-test-id="lotto-purchase-input"]');
      const lottoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button"]');
      lottoPurchaseInput.type('12343');
      lottoPurchaseButton.click();

      cy.get('[data-test-id="lotto-list"]').should('not.be.visible');
      cy.get('[data-test-id="lotto-input"]').should('not.be.visible');
    });
  });

  describe('Lotto Ticket Management', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5500/')

      const lottoPurchaseInput = cy.get('[data-test-id="lotto-purchase-input"]');
      const lottoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button"]');
      lottoPurchaseInput.type('10000');
      lottoPurchaseButton.click();
    });

    it('번호보기 토글버튼을 누르면 로또들의 번호가 옆에 표시된다.', () => {
      const lottoNumberToggleButton = cy.get('[data-test-id="lotto-number-toggle-button"]');
      lottoNumberToggleButton.click();
      const lottoList = cy.get('[data-test-id="lotto-table"]').children().children();

      lottoList.each((el) => {
        cy.wrap(el).children().should('have.length', 2);
        cy.wrap(el).children().get('.d-none').should('not.exist');
      });
    });
  });

  describe('My Lotto Input', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5500/')

      const lottoPurchaseInput = cy.get('[data-test-id="lotto-purchase-input"]');
      const lottoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button"]');
      lottoPurchaseInput.type('10000');
      lottoPurchaseButton.click();
    });

    it('내 복권 번호를 모두 입력해야 한다.', () => {
      const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
      const lottoSubmitButton = cy.get('[data-test-id="lotto-result-submit-button"]');
      lottoSubmitButton.click();

      cy.get('[data-test-id="modal"]').should('not.be.visible');
    });

    it('복권 번호들은 중복되어선 안된다.', () => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
      });

      const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
      lottoNumberInputsContainer.find('input').each((el) => cy.wrap(el).type('2'));
      const lottoSubmitButton = cy.get('[data-test-id="lotto-result-submit-button"]');
      lottoSubmitButton.click();

      cy.get('[data-test-id="modal"]').should('not.be.visible');
    });

    it('복권 번호 2자리를 입력하면 그 다음 Input으로 focus되어야 한다.', () => {
      const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
      lottoNumberInputsContainer.find('input').first().type('32').next().should('be.focused');
    });

    it('결과 확인하기를 누르면 결과 모달을 띄워 결과를 보여준다.', () => {
      const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
      let counter = 1;
      lottoNumberInputsContainer.find('input').each((el) => cy.wrap(el).type(counter++));
      const lottoSubmitButton = cy.get('[data-test-id="lotto-result-submit-button"]');
      lottoSubmitButton.click();

      cy.get('[data-test-id="modal"]').should('be.visible');
    });
  });

  describe('Result Modal', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5500/')

      const lottoPurchaseInput = cy.get('[data-test-id="lotto-purchase-input"]');
      const lottoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button"]');
      lottoPurchaseInput.type('10000');
      lottoPurchaseButton.click();

      const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
      let counter = 1;
      lottoNumberInputsContainer.find('input').each((el) => cy.wrap(el).type(counter++));
      const lottoSubmitButton = cy.get('[data-test-id="lotto-result-submit-button"]');
      lottoSubmitButton.click();
    });

    it('모달의 x버튼을 누르면 모달은 사라진다.', () => {
      const modalCloseButton = cy.get('[data-test-id="modal-close-button"]');
      modalCloseButton.click();

      cy.get('[data-test-id="modal"]').should('not.be.visible');
    });

    it('다시 시작하기를 누르면 모든 input들이 초기화 되고 처음 상태로 돌아간다.', () => {
      const resetButton = cy.get('[data-test-id="reset-button"]');
      resetButton.click();

      cy.get('[data-test-id="modal"]').should('not.be.visible');
      cy.get('[data-test-id="lotto-list"]').should('not.be.visible');
      cy.get('[data-test-id="lotto-input"]').should('not.be.visible');

      cy.get('[data-test-id="lotto-purchase"]').should('be.visible');
      cy.get('[data-test-id="lotto-purchase-input"]').should('have.value', '');
    });
  });
})


