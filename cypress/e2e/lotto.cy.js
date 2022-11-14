import { lotto } from "../../src/js/lotto";

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

  it("금액에 해당하는 로또를 발급해야 한다.", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    const $purchaseInput = cy.get('[data-cy="purchaseInput"]');
    const $confirmButton = cy.get('[data-cy="confirmButton"]');

    $purchaseInput.type("1001");
    $confirmButton.click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith(
        "로또 구입 금액을 1,000원 단위로 입력해 주세요."
      );
    });

    cy.delete($purchaseInput);

    $purchaseInput.type("3000");
    $confirmButton.click();
    lotto.lottos.length === 3;
  });

  it("소비자는 자동 구매를 할 수 있어야 한다.", () => {
    const $purchaseInput = cy.get('[data-cy="purchaseInput"]');
    const $confirmButton = cy.get('[data-cy="confirmButton"]');
    const $totalPurchaseMessage = cy.get('[data-cy="totalPurchaseMessage"]');

    $purchaseInput.type("4000");
    $confirmButton
      .click()
      .then(() =>
        $totalPurchaseMessage.should("have.text", "총 4개를 구매하였습니다.")
      );

    const lottoIcons = cy.get(".lotto-icon");
    lottoIcons.should("have.length", 4);
  });

  it("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
    const $purchaseInput = cy.get('[data-cy="purchaseInput"]');
    const $confirmButton = cy.get('[data-cy="confirmButton"]');
    const $switch = cy.get('[data-cy="switch"]');

    $purchaseInput.type("5000");
    $confirmButton.click();

    // toggle-swich on
    $switch.click();

    let lottoNumbers = cy.get(".lotto-numbers");
    lottoNumbers.should("have.length", 5);

    // toggle-swich off
    $switch.click();

    lottoNumbers = cy.get(".lotto-numbers");
    lottoNumbers.should("have.css", "display", "none");
  });
});
