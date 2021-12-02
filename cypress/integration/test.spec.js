describe("lotto test", () => {
	beforeEach("로또 사이트로 이동한다.", () => {
		cy.visit("http://127.0.0.1:5500/");
	});

	it("Step1 - 1000원 미만 구매시 로또를 살 수 없고, 경고창을 표시한다.", () => {
		const alertStub = cy.stub();
		cy.on("window:alert", alertStub);
		cy.get(".payment-input")
			.type("500")
			.then(() => {
				cy.get(".payment-submit")
					.click()
					.then(() => {
						expect(alertStub.getCall(0)).to.be.calledWith(
							"1,000원 이상 입력해주세요"
						);
					});
			});
	});

	it("Step1 - 1000원 이상 구매시 로또를 살 수 있다", () => {
		cy.get(".payment-input")
			.type("3000")
			.then(() => {
				cy.get(".payment-submit").click();
				cy.get(".purchase-count").should(
					"have.text",
					"총 3개를 구매하였습니다."
				);
			});
	});

	it("Step1 - 로또 구매 후 토글버튼을 누르면 번호를 확인할 수 있다", () => {
		cy.get(".payment-input")
			.type("2000")
			.then(() => {
				cy.get(".payment-submit").click();
				cy.get(".text-base").click();
				cy.get(".lotto-numbers")
					.first()
					.should(($target) => {
						const text = $target.text();
						console.log(text);
						expect(text.split(",").length).to.eq(6);
					});
			});
	});
});
