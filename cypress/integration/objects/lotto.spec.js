import Lotto from "../../../src/js/domain/lotto.js";
import { LottoMaker } from "../../../src/js/domain/lottoMaker.js";
import { LottoStore, LOTTO_PRICE } from "../../../src/js/domain/lottoStore.js";
import { PRIZE, Winnning } from "../../../src/js/domain/winning.js";
import WinningLotto from "../../../src/js/domain/winningLotto.js";

const LOTTO_SIZE = 6;

describe("로또를 생성한다", () => {
  const test = [1, 2, 2, 3];
  const predict = [1, 2, 3];
  const lotto = new Lotto(test);
  it("로또 번호는 중복되게 만들 수 없다", () => {
    cy.wrap(lotto).invoke("getLottoNumbers").should("deep.eq", predict);
  });

  it("로또번호는 해당하는 번호와 몇개 매치되었는지 알 수 있다", () => {
    const matching = [2, 3, 4];
    cy.wrap(lotto).invoke("match", matching).should("eq", 2);
  });

  it("로또메이커는 6개의 로또를 만들 수 있다.", () => {
    const lottoMaker = new LottoMaker();
    cy.wrap(lottoMaker).invoke("makeLotto").its("length").should("eq", 6);
  });

  it("로또메이커는 전략에 따라 로또를 만들 수 있다.", () => {
    const lottoMaker = new LottoMaker((numbers) => numbers.reverse());
    const predict = [45, 44, 43, 42, 41, 40];
    cy.wrap(lottoMaker).invoke("makeLotto").should("deep.eq", predict);
  });
});

describe("로또를 구매한다", () => {
  const lottoStore = new LottoStore();
  const buyNum = 3_000;

  it("로또는 천원에 하나씩 구매할 수 있다.", () => {
    cy.wrap(lottoStore)
      .invoke("buyLotto", buyNum)
      .its("length")
      .should("eq", buyNum / LOTTO_PRICE);
  });

  it("");
});

// describe("당첨로또를 생성한다", () => {
//   it("당첨로또 번호는 중복되게 생성할 수 없다", () => {
//     const test = [1, 2, 2];
//     const bonus = 3;
//     const predict = [1, 2];
//     const winning = new WinningLotto(test, bonus);
//     cy.wrap(winning).invoke("getWinningNumbers").should("deep.eq", predict);
//   });
// });

describe("총 당첨자를 확인한다", () => {
  let winning;
  const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
  const fifthLotto = new Lotto([3, 4, 5, 7, 8, 9]);
  const secondLotto = new Lotto([2, 3, 4, 5, 6, 7]);
  const thirdLotto = new Lotto([2, 3, 4, 5, 6, 8]);
  const noMatchLotto = new Lotto([10, 11, 12, 13, 14, 15]);
  const winningResults = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"];

  beforeEach("당첨결과 초기화", () => {
    winning = new Winnning();
  });

  it("당첨결과를 생성한다", () => {
    winningResults.forEach((results) => {
      cy.wrap(winning).invoke("showResult").its(results).should("eq", 0);
    });
  });

  it("3개가 일치하면 5등상 당첨자수가 늘어난다.", () => {
    cy.wrap(winning).invoke("match", winningLotto, fifthLotto);
    cy.wrap(winning).invoke("showResult").its("FIFTH").should("eq", 1);
    cy.wrap(winning).invoke("match", winningLotto, fifthLotto);
    cy.wrap(winning).invoke("showResult").its("FIFTH").should("eq", 2);
  });

  it("5개 일치시 보너스볼이 일치하면 2등상이다.", () => {
    cy.wrap(winning).invoke("match", winningLotto, secondLotto);
    cy.wrap(winning).invoke("showResult").its("SECOND").should("eq", 1);
    cy.wrap(winning).invoke("showResult").its("THIRD").should("eq", 0);
  });
  it("5개 일치시 보너스볼이 일치하지 않으면 3등상이다.", () => {
    cy.wrap(winning).invoke("match", winningLotto, thirdLotto);
    cy.wrap(winning).invoke("showResult").its("SECOND").should("eq", 0);
    cy.wrap(winning).invoke("showResult").its("THIRD").should("eq", 1);
  });

  it("수익률을 계산한다", () => {
    const lottos = [thirdLotto, secondLotto, fifthLotto, noMatchLotto];
    const buyPrice = lottos.length * LOTTO_PRICE;
    const result = PRIZE.THIRD + PRIZE.SECOND + PRIZE.FIFTH;
    cy.wrap(winning).invoke("matchAll", winningLotto, lottos);
    cy.wrap(winning)
      .invoke("yields")
      .should("eq", Math.floor(((result - buyPrice) / buyPrice) * 100));
  });
});
