const DATA_CYPRESS_NAME = 'data-cy';

const DATA_CYPRESS_ELEMENTS = {
  AMOUNT_FORM: 'amountForm',
  LOTTO_LIST: 'lottoList',
  LOTTO_AMOUNT: 'lottoAmount',
};

const validateLotto = numbers => {
  if (numbers.length !== 6) throw new Error('Lotto should have 6 numbers');
  const removeDuplicate = new Set(numbers);
  if (removeDuplicate.size !== 6) throw new Error('Lotto should not have duplicate numbers');
};

describe('로또 테스트', () => {
  before(() => {
    cy.visit('/');
  });

  it.only('최초 접속했을 경우, 금액 입력창이 비워져 있다.', () => {
    cy.get(`[${DATA_CYPRESS_NAME}="${DATA_CYPRESS_ELEMENTS.AMOUNT_FORM}"]`).within(() => {
      cy.get('input').should('have.value', '');
    });
  });
  it('금액 입력창에 1000원 단위가 아닌 금액을 입력 후 구매한다.', () => {
    cy.get(`[${DATA_CYPRESS_NAME}="${DATA_CYPRESS_ELEMENTS.AMOUNT_FORM}"]`).within(() => {
      cy.root().then($form => {
        $form.on('submit', e => {
          e.preventDefault();
        });
      });
      cy.get('input').type(7777);
      cy.root().submit();
    });
    cy.alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
    cy.get(`[${DATA_CYPRESS_NAME}="${DATA_CYPRESS_ELEMENTS.AMOUNT_FORM}"]`).within(() => {
      cy.get('input').should('have.value', '');
    });
  });
  it('1000원 단위 금액 입력 후 구매한다.', () => {
    cy.get(`[${DATA_CYPRESS_NAME}="${DATA_CYPRESS_ELEMENTS.AMOUNT_FORM}"]`).within(() => {
      cy.get('input').type(7000);
      cy.root().submit();
    });
    cy.get(`[${DATA_CYPRESS_NAME}="${DATA_CYPRESS_ELEMENTS.LOTTO_AMOUNT}"]`).should(
      'have.text',
      '총 7개를 구매하였습니다.'
    );
    cy.get(`[${DATA_CYPRESS_NAME}="${DATA_CYPRESS_ELEMENTS.LOTTO_LIST}"]`).should('have.length', 7);
    cy.get('.lotto-number').each($lottoNumber => {
      const numbers = $lottoNumber
        .text()
        .split(',')
        .map(num => Number(num.trim()));
      validateLotto(numbers);
    });
  });

  it('번호보기 라디오 버튼을 On으로 토글한다.', () => {
    cy.get(`[${DATA_CYPRESS_NAME}="${DATA_CYPRESS_ELEMENTS.LOTTO_LIST}"]`).within(() => {
      cy.get('.lotto-number').should('have.length', 7);
      cy.get('.lotto-number').each($lottoNumber => {
        expect($lottoNumber).to.not.have.css('display', 'none');
      });
    });
  });

  it('번호보기 라디오 버튼을 Off으로 토글한다.', () => {
    cy.get(`[${DATA_CYPRESS_NAME}="${DATA_CYPRESS_ELEMENTS.LOTTO_LIST}"]`).within(() => {
      cy.get('.lotto-number').should('have.length', 7);
      cy.get('.lotto-number').each($lottoNumber => {
        expect($lottoNumber).to.not.have.css('display', 'inline');
      });
    });
  });
});
