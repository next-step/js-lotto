describe("로또", () => {
  const inputAmounSelector = "#lotto-input-form input";
  const confirmPurchaseBtnSelector = "#lotto-input-form .confirm-purchase";
  const purchaseResultSelector = ".purchase-result-txt span";
  const purchaseResultLottoIconSelector = ".lotto-icon";
  const switchInputelector = ".switch input[type=checkbox]";
  before(() => {
    cy.visit("../../../index.html");
  });

  describe("로또 구입 금액 입력한다", () => {
    it("구입 금액을 입력할 input 태그가 있다", () => {
      cy.get(inputAmounSelector).should("exist");
    });

    it("로또 구입 금액을 입력하면 화면에 입력한 금액이 그대로 보여져야 한다. ", () => {
      cy.get(inputAmounSelector).type(900);
      cy.get(inputAmounSelector).should("have.value", 900);
      cy.get(inputAmounSelector).clear();
    });

    it("로또 구입 금액을 입력하면 화면에 입력한 금액이 숫자만 보여진다. ", () => {
      cy.get(inputAmounSelector).type("900a");
      cy.get(inputAmounSelector).should("have.value", 900);
      cy.get(inputAmounSelector).clear();
    });
  });

  describe("금액에 해당하는 로또를 자동 발급한다.", () => {
    it("확인 버튼을 클릭하여 1,000원 단위로 발급이 불가하면 얼럿창을 띄운다", () => {
      const invalidAlertStub = cy.stub();
      cy.on("window:alert", invalidAlertStub);

      cy.get(inputAmounSelector).type(900);
      cy.get(confirmPurchaseBtnSelector)
        .click()
        .then(() => {
          expect(invalidAlertStub.getCall(0)).to.be.calledWith(
            "입력하신 금액이 유효하지 않습니다."
          );
        });
      cy.get(inputAmounSelector).clear();
    });

    it(`확인 버튼을 클릭하여 유효한 금액이면, 
    총 “금액/1000”개를 구매하였습니다 텍스트가 노출되고,
    갯수만큼 티켓 이미지가 노출된다.`, () => {
      cy.get(inputAmounSelector).type(4000);
      cy.get(confirmPurchaseBtnSelector).click();

      cy.get(purchaseResultSelector).should("have.text", 4000 / 1000);
      cy.get(purchaseResultLottoIconSelector).should(
        "have.length",
        4000 / 1000
      );
    });
  });

  describe("번호보기 스위치 누르면 숨겨진 로또 번호를 볼 수 있다", () => {
    it("번호보기 스위치 토글 버튼을 누르면 6개의 숫자로 이루어진 (금액/1000개)의 로또번호들을 볼 수 있다", () => {
      cy.get(switchInputelector).check({ force: true });
      cy.get("#lotto-icons li").should("have.length", 4000 / 1000);
    });

    it("금액/1000개의 각 로또 번호는 6개의 랜덤한 1~45 사이의 숫자이며 중복되지 않는다.", () => {
      const lottoDetails = cy.get(".lotto-detail");
      lottoDetails.each(($el) => {
        const text = $el.text();
        const numArray = text.split(",");
        const lottoNumberSet = new Set();

        expect(numArray.length).to.equal(6);
        expect(numArray).to.be.instanceOf(Array);
        numArray.forEach((el) => {
          expect(lottoNumberSet.has(el)).to.equal(false);
          expect(Number(el)).within(1, 45);
          lottoNumberSet.add(el);
        });
      });
    });
  });
});
