describe('로또 렌더링 테스트', () => {
  it('구입하지 않은 상태에서 구입 금액 칸과 확인 버튼만 보인다.', () => {
    cy.visit('../../index.html');
    cy.get('.purchasing-lotto-input').should('exist');
    cy.get('.purchasing-lotto-btn').should('exist');
    cy.get('.hidden').should('have.css', 'display', 'none');
  });

  const PRICE_INPUT = 3000;
  const PURCHASED_LOTTO_COUNT = 3;

  beforeEach(() => {
    cy.visit('../../index.html');
    cy.clickPurchaseBtn(PRICE_INPUT);
  });

  it('구입한 상태에서 로또 결과 창과 당첨 번호 창이 보인다.', () => {
    cy.get('.purchased-result').should('have.css', 'display', 'block');
  });

  it('구입을 한 상태에서 총 로또 구입 개수를 화면에 표시한다.', () => {
    const validateCount = (count) => {
      cy.get('.purchased-lotto-count').should('have.text', `총 ${count}개를 구매하였습니다.`);
    };
    validateCount(PURCHASED_LOTTO_COUNT);
  });

  it('구입을 한 상태에서 구입 갯수만큼 로또 그림을 화면에 표시한다.', () => {
    const checkLottoIconCount = (count) => {
      cy.get('.purchased-lotto-list').get('li').should('have.length', count);
    };
    checkLottoIconCount(PURCHASED_LOTTO_COUNT);
  });

  it('구입한 상태에서 번호 보기 토글 버튼을 클릭했을 때 중복되지 않은 랜덤한 6개의 숫자를 화면에 표시한다.', () => {
    const showLottoItemNumbers = () =>
      cy.get('.lotto-item-numbers').should('have.css', 'display', 'block');
    cy.get('.switch').click();
    showLottoItemNumbers();
  });

  describe('로또 번호 보기 토글 버튼 테스트', () => {
    const showLottoItemNumbers = () =>
      cy.get('.lotto-item-numbers').should('have.css', 'display', 'block');
    const hideLottoItemNumbers = () =>
      cy.get('.lotto-item-numbers').should('have.css', 'display', 'none');

    it('로또를 구입한 상태에서 토글 버튼이 존재한다.', () => {
      cy.get('.lotto-numbers-toggle-btn').should('exist');
    });

    it('로또를 구매한 상태에서 번호 보기 토글 버튼을 누르면 각 로또마다 랜덤한 6개의 번호가 보인다.', () => {
      cy.get('.switch').click();
      showLottoItemNumbers();
    });

    it('번호 보기 토글 버튼이 체크된 상태에서 번호 보기 토글 버튼을 누르면 로또 번호가 화면에 보이지 않는다.', () => {
      cy.get('.switch').click();
      showLottoItemNumbers();
      cy.get('.switch').click();
      hideLottoItemNumbers();
    });
  });
});
