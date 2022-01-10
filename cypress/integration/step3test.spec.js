import { MESSAGE } from "../../src/js/utils/constants.js";

describe("lotto test", () => {
	beforeEach("로또 사이트로 이동한다.", () => {
		cy.visit("http://127.0.0.1:5500/");
	});

	it("Step3 - 수동번호 추가시 중복된 번호가 있을시 경고창을 표시한다.", () => {
		const alertStub = cy.stub();
		cy.on("window:alert", alertStub);
		cy.get(".payment-input").type("2000");
		cy.get(".payment-submit").click();
		cy.get(".manual-number").eq(0).type("1");
		cy.get(".manual-number").eq(1).type("2");
		cy.get(".manual-number").eq(2).type("3");
		cy.get(".manual-number").eq(3).type("4");
		cy.get(".manual-number").eq(4).type("5");
		cy.get(".manual-number").eq(5).type("5");
		cy.get(".manual-numbers-confirm-button")
			.click()
			.then(() => {
				expect(alertStub.getCall(0)).to.be.calledWith(MESSAGE.DUPLICATE_NUMBER);
			});
	});

	it("Step3 - 수동번호 입력 후 수익률이 올바른지 비교해본다.", () => {
		const alertStub = cy.stub();
		cy.on("window:alert", alertStub);
		cy.get(".payment-input").type("1000");
		cy.get(".payment-submit").click();
		cy.get(".manual-number").eq(0).type("1");
		cy.get(".manual-number").eq(1).type("2");
		cy.get(".manual-number").eq(2).type("3");
		cy.get(".manual-number").eq(3).type("4");
		cy.get(".manual-number").eq(4).type("5");
		cy.get(".manual-number").eq(5).type("6");
		cy.get(".manual-numbers-confirm-button").click();
		cy.get(".winning-number").eq(0).type("1");
		cy.get(".winning-number").eq(1).type("2");
		cy.get(".winning-number").eq(2).type("3");
		cy.get(".winning-number").eq(3).type("14");
		cy.get(".winning-number").eq(4).type("15");
		cy.get(".winning-number").eq(5).type("16");
		cy.get(".bonus-number").eq(0).type("17");
		cy.get(".open-result-modal-button").click();
		cy.get(".lotto-numbers")
			.first()
			.then(() => {
				cy.get(".result-profit-rate").should(
					"have.text",
					`당신의 총 수익률은 400%입니다.`
				);
			});
	});

	it("Step3 - 수동번호 입력 후 결과버튼을 클릭하면 자동구매가 된다.", () => {
		const alertStub = cy.stub();
		cy.on("window:alert", alertStub);
		cy.get(".payment-input").type("3000");
		cy.get(".payment-submit").click();
		cy.get(".manual-number").eq(0).type("1");
		cy.get(".manual-number").eq(1).type("2");
		cy.get(".manual-number").eq(2).type("3");
		cy.get(".manual-number").eq(3).type("4");
		cy.get(".manual-number").eq(4).type("5");
		cy.get(".manual-number").eq(5).type("6");
		cy.get(".manual-numbers-confirm-button").click();
		cy.get(".winning-number").eq(0).type("1");
		cy.get(".winning-number").eq(1).type("2");
		cy.get(".winning-number").eq(2).type("3");
		cy.get(".winning-number").eq(3).type("14");
		cy.get(".winning-number").eq(4).type("15");
		cy.get(".winning-number").eq(5).type("16");
		cy.get(".bonus-number").eq(0).type("17");
		cy.get(".open-result-modal-button").click();
		cy.get(".lotto-icon").should("have.length", 3);
	});
});
