const HTML = "../../index.html";

describe("로또 구입 금액을 입력하면 금액에 해당하는 로또를 발급해야 한다.", () => {
	beforeEach(() => {
		cy.visit(HTML);
	});

	it("로또 구입 금액을 입력한다", () => {
		// - 입력할 input 태그가 있다.
		const purchaseInput = cy.get('[data-cy="purchaseInput"]');
		// - 로또 구입 금액을 입력하면 화면에 입력한 금액이 그대로 보여져야 한다.
		purchaseInput.type("5000");
		purchaseInput.should("have.value", "5000");
		// - 금액은 숫자만 입력할 수 있다.
		purchaseInput.type("{selectAll}");
		purchaseInput.type("{del}");
		purchaseInput.type("1000a");
		purchaseInput.should("have.value", "1000");
		// - 값은 100000 이하여야 한다.
	});

	it("금액에 해당하는 로또를 발급해야 한다.", () => {
		const stub = cy.stub();
		cy.on("window:alert", stub);

		const purchaseInput = cy.get('[data-cy="purchaseInput"]');

		// - 클릭할 확인 버튼이 있다.
		const confirmButton = cy.get('[data-cy="confirmButton"]');
		// - 확인 버튼을 클릭할 수 있어야 한다.
		// - 1,000원 단위로 입력이 되지 않았을 경우 alert를 띄워준다.
		// - 999원, 1001원, -1,500원
		// - asbc, 가나다라, 1000a
		purchaseInput.type("999");
		confirmButton.click().then(() => {
			expect(stub.getCall(0)).to.be.calledWith("1000원 단위로 입력해주세요.");
		});

		//  - 확인 버튼을 클릭했을 때, 입력한 금액에 맞는 로또 개수가 발급되어야 한다.
	});
});
