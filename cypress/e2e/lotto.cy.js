import { LOTTO } from "../../src/js/constants/lotto";

const HTML = "../../index.html";

describe("로또 구입 금액을 입력하면 금액에 해당하는 로또를 발급해야 한다.", () => {
	beforeEach(() => {
		cy.visit(HTML);
	});

	it("로또 구입 금액을 입력한다", () => {
		const $purchaseInput = cy.get('[data-cy="purchaseInput"]');

		$purchaseInput.type("5000");
		$purchaseInput.should("have.value", "5000");

		cy.delete($purchaseInput);

		$purchaseInput.type("1000a");
		$purchaseInput.should("have.value", "1000");
	});

	it("금액에 해당하는 로또를 자동으로 발급해야 한다.", () => {
		const stub = cy.stub();
		cy.on("window:alert", stub);

		const $purchaseInput = cy.get('[data-cy="purchaseInput"]');
		const $confirmButton = cy.get('[data-cy="confirmButton"]');

		// 1001원
		cy.getLottos($purchaseInput, $confirmButton, 1001).then(() => {
			expect(stub.getCall(0)).to.be.calledWith(
				"로또 구입 금액을 1,000원 단위로 입력해 주세요."
			);
		});

		// 4000원
		cy.delete($purchaseInput);
		cy.getLottos($purchaseInput, $confirmButton, 4000).then(() => {
			const $totalLottoCount = cy.get('[data-cy="totalLottoCount"]');
			$totalLottoCount.should("have.text", 4);
		});

		const $lottoIcons = cy.get(".lotto-icon");
		$lottoIcons.should("have.length", 4);
	});

	it("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
		const $purchaseInput = cy.get('[data-cy="purchaseInput"]');
		const $confirmButton = cy.get('[data-cy="confirmButton"]');
		const $switch = cy.get('[data-cy="switch"]');

		cy.getLottos($purchaseInput, $confirmButton, 5000);

		// toggle-swich on
		$switch.click();

		let lottoNumbers = cy.get(".lotto-numbers");
		lottoNumbers.should("have.length", 5);

		// toggle-swich off
		$switch.click();

		lottoNumbers = cy.get(".lotto-numbers");
		lottoNumbers.should("have.css", "display", "none");
	});

	it("결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.", () => {
		const $purchaseInput = cy.get('[data-cy="purchaseInput"]');
		const $confirmButton = cy.get('[data-cy="confirmButton"]');
		const $showResultButton = cy.get('[data-cy="showResultButton"]');
		cy.getLottos($purchaseInput, $confirmButton, 5000);

		cy.get(".winning-number").then((inputs) => {
			[...inputs].forEach((input) =>
				cy
					.wrap(input)
					.type(Math.floor(Math.random() * LOTTO.MAX_NUMBER) + LOTTO.MIN_NUMBER)
			);
		});

		$showResultButton.click();
		cy.get('[data-cy="modal"]').should("have.class", "open");
	});
});
