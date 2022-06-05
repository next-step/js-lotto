/**
 * <테스트 요구사항>
 * 1. 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
 *   [x] 구매내역을 보여주는 section과 당첨번호를 입력하는 form은 나타나지 않아야 한다.
 *   [] 확인 버튼을 누르면 input에 입력된 데이터가 있는지를 확인한다.
 *     a. 없을 경우 '이 입력란을 작성하세요.'라는 메세지가 input 하단에 나타난다.
 *     b. 있을 경우 구매내역을 보여주는 section을 노출한다.
 *     c. 1000 단위로 나뉘어지지 않는 금액이 입력된 경우 '로또 구입 금액을 1,000원 단위로 입력해 주세요.'라는 메세지가 alert로 나타난다.
   2. 로또 1장의 가격은 1,000원이다.
     - 
   3. 소비자는 자동 구매를 할 수 있어야 한다.
     -
   4. 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.
     -
 */


    describe('로또 앱 테스트', () => {
      beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/index.html')
      })

      it('시작과 동시에 빈인풋과 확인버튼이 보여진다.', () => {
        cy.get('#purchace-amount-input').should('be.visible');
      })

      it('최초에 구매내역과 당첨번호 입력란이 보여지는 DOM은 나타나지 않아야 한다.', () => {
        cy.get('section').should('not.be.visible');
        cy.get('#winning-number-input-form').should('not.be.visible');
      })

      context('로또 구입 시 구입내역이 화면에 나타나야 한다.', () => {
        it('인풋에 3000을 입력하면 3개의 복권 구매 내역이 나타난다.', () => {
          cy.get('#purchace-amount-input').type('3000');
          cy.get('#confirm-button').click();

          cy.get('#purchased-result-text').should('have.text', '총 3개를 구매하였습니다.');
        })
      })
    })