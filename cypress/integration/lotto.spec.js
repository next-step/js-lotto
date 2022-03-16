describe('Lotto test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Input에 관련한 테스트', () => {
    it('금액 단위가 1000원 단위 체크 ( alert 창 “로또 구입 금액을 1,000원 단위로 입력해 주세요" )', () => {
      
    })

    it('금액 단위가 1000원 단위가 아닐 때 alert 확인 버튼 클릭 시 input tag 초기화', () => {
      
    })

    describe('input 이벤트는 click과 enter 두가지다', () => {
      it('input validation 실패 시 아래 UI가 보이지 않아야한다.', () => {
        
      })

      it('확인 버튼 click 시 input value의 결과가 반영된다.', () => {

      })

      it('input value를 작성하고 enter 버튼을 누르면 input value의 결과가 반영된다.', () => {
        cy.get('[data-amount=purchase]').type('1000{enter}')
      })
    })

  })

  describe('Toggle에 관련한 테스트', () => {
    it('Toggle click event에 따라 랜덤 숫자가 보여야 한다', () => {
      
    })

    it('구매한 갯수에 따라 총 개수 체크', () => {

    })

    it('랜덤 숫자는 1부터 45까지로 제한한다', () => {

    })
  })
  
})
