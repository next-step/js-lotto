/**
 * <테스트 요구사항>
 * 1. 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
 *   - 사용자가 입력하는 데이터가 input창에 나타나야 한다.
 *   - 구매내역을 보여주는 section은 나타나지 않아야 한다.
 *   - 확인 버튼을 누르면 input에 입력된 데이터가 있는지를 확인한다.
 *     a. 없을 경우 '이 입력란을 작성하세요.'라는 메세지가 input 하단에 나타난다.
 *     b. 있을 경우 구매내역을 보여주는 section을 노출한다.
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

      it('최초에 구매내역이 보여지는 DOM은 나타나지 않아야 한다.', () => {
        cy.get('section').should('not.be.visible');
      })
    })