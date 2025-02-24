const selector = {
    LOTTO_CONTENT_ID: "#lottos",
    LOTTO_COUNT_CONTENT_ID: "#lottoCount",
    MODAL_PAGE_ID: "#modal",
    TABLE_BODY: "table tbody",
    RATE_OF_RETURN_CONTENT_ID: "#rateOfReturn",
    BONUS_NUMBER_CONTENT_ID: "#bonusNumber",
    MONEY_ID: "#money",
    BUY_LOTTO_BUTTON_ID: "#buyButton",
    LOTTO_LI: "#lottos li",
    CONFIRM_BUTTON_ID: "#confirmButton",
    CLOSE_BUTTON_ID: "#closeButton",
    RESTART_BUTTON_ID: "#restartButton",
    MODAL_ID: "#modal",
    RATE_OF_RETURN_ID: "#rateOfReturn",
    MODAL_TBODY_TR: "#modal tbody tr"
};

describe("구매한 로또 목록 기능 테스트", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:3000/index.html");

        cy.get(selector.MONEY_ID).clear().type(2000);
        cy.get(selector.BUY_LOTTO_BUTTON_ID).click();
    });

    it("2000원 금액을 입력하고 로또를 2장 구매한다", () => {
        cy.get(selector.LOTTO_COUNT_CONTENT_ID).should("have.text", "총 2개를 구입하였습니다.");
        cy.get(selector.LOTTO_LI).should("have.length", 2);
    });

    it("당첨 번호를 입력하고 결과를 확인", () => {
        cy.get(".winning-numbers-container input[type='number']").each((input, index) => {
            cy.wrap(input).type(index + 1);
        });

        cy.get("#bonusNumber").type(7); 
        cy.get("#confirmButton").click();

        cy.get("#modal").should("be.visible");

        cy.get("#rateOfReturn").should("contain", "당신의 총 수익률은");
        cy.get("#modal tbody tr").should("exist");

        cy.get("#modal tbody tr").each((tr) => {
            cy.wrap(tr).find("td").then(($tds) => {
                const count = $tds[0].innerText;
                const prize = $tds[1].innerText;
                const value = $tds[2].innerText;

                cy.log(`일치 개수: ${count}, 당첨금: ${prize}, 당첨 개수: ${value}`);

                //형식검증
                if (count.includes("+")) {
                    expect(count).to.match(/^\d+\+\D+개$/);
                } else {
                    expect(count).to.match(/^\d+개$/);
                }

                expect(prize).to.match(/^\d+(,\d{3})*$/);
                expect(value).to.match(/^\d+개$/);
            });
        });
    });

    it("다시 시작하기 버튼 클릭 후 입력 내용이 초기화 되어야 함", () => {
        cy.get(".winning-numbers-container input[type='number']").each((input, index) => {
            cy.wrap(input).type(index + 1);
        });
        cy.get(selector.BONUS_NUMBER_CONTENT_ID).type(7);

        cy.get(selector.CONFIRM_BUTTON_ID).click();
        cy.get(selector.RESTART_BUTTON_ID).click();

        cy.get(selector.LOTTO_CONTENT_ID).should("be.empty");
        cy.get(selector.LOTTO_COUNT_CONTENT_ID).should("be.empty");
        cy.get(selector.MONEY_ID).should("have.value", "");
    });

    it("모달 닫기 버튼 클릭 후 모달이 사라져야 함", () => {
        cy.get(".winning-numbers-container input[type='number']").each((input, index) => {
            cy.wrap(input).type(index + 1);
        });
        cy.get(selector.BONUS_NUMBER_CONTENT_ID).type(7);

        cy.get(selector.CONFIRM_BUTTON_ID).click();

        cy.get(selector.CLOSE_BUTTON_ID).click();

        cy.get(selector.MODAL_ID).should("not.be.visible");
    });
});