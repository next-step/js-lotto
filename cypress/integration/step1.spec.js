before(() => {
  cy.visit("/");
});

describe("로또 테스트 step 1", () => {
  it("로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
    //given
    const lottoPrice = 5000;

    //when
    cy.inputPrice(lottoPrice);

    //then
    cy.get(".purchased-numbers-wrapper .ticket").should("have.length", 5);
  });

  it("로또 구입 금액이 1000원 미만이면, 금액에 해당하는 로또를 발급하지 않는다.", () => {
    //given
    const lottoPrice = 900;

    //when
    cy.inputPrice(lottoPrice);

    //then
    cy.get(".purchased-numbers-wrapper .ticket").should("have.length", 0);
  });

  it("로또 구입후 잔돈이 남으면, 잔돈을 제외한 금액만큼 로또를 발급해야 한다.", () => {
    //given
    const lottoPrice = 1120;

    //when
    cy.inputPrice(lottoPrice);

    //then
    cy.get(".purchased-numbers-wrapper .ticket").should("have.length", 1);
  });

  it("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
    //given

    //when
    cy.checkToggle();

    //then
    cy.get(".purchased-numbers-wrapper span.numbers").should("be.visible");
  });

  it("복권 번호는 번호보기 토글 버튼을 다시 해제하면, 번호를 볼 수 없어야 한다.", () => {
    //given

    //when
    cy.unCheckToggle();

    //then
    cy.get(".purchased-numbers-wrapper span.numbers").should("not.be.visible");
  });
});
