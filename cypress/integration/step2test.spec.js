import { MESSAGE } from "../../src/js/utils/constants.js";
import {
	countLottoRank,
	calculateProfitRate,
} from "../../src/js/utils/service.js";

describe("lotto test", () => {
	beforeEach("로또 사이트로 이동한다.", () => {
		cy.visit("http://127.0.0.1:5500/");
	});

	it("Step2 - 당첨번호에 빈킨이 있을시 경고창을 표시한다.", () => {
		const alertStub = cy.stub();
		cy.on("window:alert", alertStub);
		cy.get(".payment-input").type("2000");
		cy.get(".payment-submit").click();
		cy.get(".winning-number").eq(0).type("1");
		cy.get(".winning-number").eq(1).type("2");
		cy.get(".open-result-modal-button")
			.click()
			.then(() => {
				expect(alertStub.getCall(0)).to.be.calledWith(MESSAGE.BLANK_INPUT);
			});
	});

	it("Step2 - 당첨번호에 중복된 번호가 있을시 경고창을 표시한다.", () => {
		const alertStub = cy.stub();
		cy.on("window:alert", alertStub);
		cy.get(".payment-input").type("2000");
		cy.get(".payment-submit").click();
		cy.get(".winning-number").eq(0).type("1");
		cy.get(".winning-number").eq(1).type("2");
		cy.get(".winning-number").eq(2).type("3");
		cy.get(".winning-number").eq(3).type("4");
		cy.get(".winning-number").eq(4).type("5");
		cy.get(".winning-number").eq(5).type("6");
		cy.get(".bonus-number").eq(0).type("6");
		cy.get(".open-result-modal-button")
			.click()
			.then(() => {
				expect(alertStub.getCall(0)).to.be.calledWith(MESSAGE.DUPLICATE_NUMBER);
			});
	});

	it("Step2 - 당첨된 복권의 수익율을 확인할 수 있다.", () => {
		const alertStub = cy.stub();
		let result = 0;
		cy.on("window:alert", alertStub);
		cy.get(".payment-input").type("1000");
		cy.get(".payment-submit").click();
		cy.get(".text-base").click();
		cy.get(".winning-number").eq(0).type("1");
		cy.get(".winning-number").eq(1).type("2");
		cy.get(".winning-number").eq(2).type("3");
		cy.get(".winning-number").eq(3).type("4");
		cy.get(".winning-number").eq(4).type("5");
		cy.get(".winning-number").eq(5).type("6");
		cy.get(".bonus-number").eq(0).type("7");
		cy.get(".open-result-modal-button").click();
		cy.get(".lotto-numbers")
			.first()
			.should(($) => {
				const purchasedLotto = $.text()
					.split(",")
					.map((val) => Number(val));
				const rankInfo = countLottoRank(
					[purchasedLotto],
					[1, 2, 3, 4, 5, 6, 7]
				);
				result = calculateProfitRate(rankInfo, 1);
			})
			.then(() => {
				cy.get(".result-profit-rate").should(
					"have.text",
					`당신의 총 수익률은 ${result}%입니다.`
				);
			});
	});
});
