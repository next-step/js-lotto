describe('로또 랜더링 테스트', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });
  it('구입하지 않은 상태에서 구입 금액 칸과 확인 버튼만 보인다.', () => {
    cy.getByDataCy('lotto-purchase-input').should('exist');
    cy.getByDataCy('lotto-purchase-btn').should('exist');
    cy.get('.hidden').should('have.css', 'display', 'none');
  });
  describe('구입을 한 상태에서 총 로또 구입 갯수를 화면에 표시한다.', () => {
    const validateCount = (count) => {
      cy.getByDataCy('purchased-lotto-count').should(
        'have.text',
        `총 ${count}개를 구매하였습니다.`,
      );
    };
    it('5000원 구입한 상태에서 총 로또 구입 갯수는 5개이다.', () => {
      cy.clickPurchaseBtn(5000);
      validateCount(5);
    });
    it('10000원 구입한 상태에서 총 로또 구입 갯수는 10개이다.', () => {
      cy.pressEnter(10000);
      validateCount(10);
    });
  });
  describe('구입을 한 상태에서 구입 갯수만큼 로또 그림을 화면에 표시한다.', () => {
    const checkLottoIconCount = (count) => {
      cy.getByDataCy('purchased-lotto-list').get('li').should('have.length', count);
    };
    it('2000원을 구입한 상태에서 2개의 로또 그림을 화면에 표시한다.', () => {
      cy.clickPurchaseBtn(2000);
      checkLottoIconCount(2);
    });
    it('15000원을 구입한 상태에서 2개의 로또 그림을 화면에 표시한다.', () => {
      cy.pressEnter(15000);
      checkLottoIconCount(15);
    });
  });
  describe('구입한 상태에서 번호 보기 토글 버튼을 클릭했을 때 중복되지 않은 랜덤한 6개의 숫자를 화면에 표시한다.', () => {
    const showLottoItemNumbers = () =>
      cy.getByDataCy('lotto-item-numbers').should('have.css', 'display', 'block');
    it('5000원을 구매한 상태에서 번호 보기 토글 버튼을 눌렀을 때 중복되지 않은 랜덤한 6개의 숫자가 화면에 표시된다.', () => {
      cy.clickPurchaseBtn(5000);
      cy.get('.switch').click();
      showLottoItemNumbers();
    });
    it('15000원을 구매한 상태에서 번호 보기 토글 버튼을 눌렀을 때 중복되지 않은 랜덤한 6개의 숫자가 화면에 표시된다.', () => {
      cy.clickPurchaseBtn(15000);
      cy.get('.switch').click();
      showLottoItemNumbers();
    });
  });
  describe('번호 보기 토글 버튼이 클릭되어있는 상태에서 토글 버튼을 클릭하면 로또 숫자는 화면에 표시되지 않는다.', () => {
    const showLottoItemNumbers = () =>
      cy.getByDataCy('lotto-item-numbers').should('have.css', 'display', 'block');
    const hideLottoItemNumbers = () =>
      cy.getByDataCy('lotto-item-numbers').should('have.css', 'display', 'none');
    const checkToggleBtn = () => {
      cy.get('.switch').click();
      showLottoItemNumbers();
      cy.get('.switch').click();
      hideLottoItemNumbers();
    };
    it('5000원을 구매한 상태에서 번호 보기 토글 버튼을 2번 누른다.', () => {
      cy.clickPurchaseBtn(5000);
      checkToggleBtn();
    });
    it('5000원을 구매한 상태에서 번호 보기 토글 버튼을 4번 누른다.', () => {
      cy.clickPurchaseBtn(5000);
      checkToggleBtn();
      checkToggleBtn();
    });
  });
});
