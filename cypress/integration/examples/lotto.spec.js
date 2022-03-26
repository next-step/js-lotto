describe("test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5500/");
    });

    it("구입 금액에 숫자가 아닌 문자를 입력 했을 때", () => {
        cy.get("[data-test=purchase-price-input]").type("asdf");
        cy.get("[data-test=purchase-price-input]").should("value", "");
    });

    it("구입 금액을 1000단위로 입력하지 않았을때 alert", () => {
        cy.get("[data-test=purchase-price-input]").type(1100);
        cy.get("[data-test=purchase-button]").click();

        cy.on("window:alert", (text) => {
            expect(text).to.contains(`금액은 1000단위로 입력해야 합니다.`);
        })
    });

    it("구입 금액을 최소 금액 1000 미만으로 입력했을 떄 alert", () => {
        cy.get("[data-test=purchase-price-input]").type(900);
        cy.get("[data-test=purchase-button]").click();

        cy.on("window:alert", (text) => {
            expect(text).to.contains(`금액은 1000이상이어야 합니다.`);
        })
    });

    it("구입 금액을 최대 금액 100,000 초과로 입력했을 떄 alert", () => {
        cy.get("[data-test=purchase-price-input]").type(200000);
        cy.get("[data-test=purchase-button]").click();

        cy.on("window:alert", (text) => {
            expect(text).to.contains(`금액은 100000이야여야 합니다.`);
        })
    });

    it("5000 입력 시 로또 5개 발급", () => {
        cy.get("[data-test=purchase-price-input]").type(5000);
        cy.get("[data-test=purchase-button]").click();

        cy.get("[data-test=lotto-ticket]").should("have.length", 5);
    })

    it("로또 5개 발급 시 amount 개수에 5 표시", () => {
        cy.get("[data-test=purchase-price-input]").type(5000);
        cy.get("[data-test=purchase-button]").click();

        cy.get("[data-test=lotto-amount]").should("have.text", 5);
    })

    it("로또 발급 후 번호 보기 클릭 시 자동 발급된 번호가 보여야 한다.", () => {
        cy.get("[data-test=purchase-price-input]").type(5000);
        cy.get("[data-test=purchase-button]").click();
        cy.get("[data-test=switch]").click();

        cy.get("[data-test=lotto-detail]").should("not.have.class", "d-none");
    })

    it("로또 발급 후 번호 보기 클릭 시 자동 발급된 번호가 보여야 한다. 재발급 시 번호가 가려지지 않고 표시되어야 한다. 발급 개수도 변경 되어야 한다.", () => {
        cy.get("[data-test=purchase-price-input]").type(5000);
        cy.get("[data-test=purchase-button]").click();
        cy.get("[data-test=switch]").click();
        cy.get("[data-test=purchase-price-input]").clear();
        cy.get("[data-test=purchase-price-input]").type(3000);
        cy.get("[data-test=purchase-button]").click();

        cy.get("[data-test=lotto-detail]").should("not.have.class", "d-none");
    })
});
