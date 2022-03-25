import { describe, it, expect } from "vitest";
import {calculateLotto, calculateProfit, drawLots} from "../../src/js/module/lotto";

describe("lotto", () => {
  it("생성된 로또 번호는 6자리이다.", () => {
    expect(drawLots()).toHaveLength(6);
  });

  describe("지불한 금액만큼만 로또를 팔 수 있다", () => {
    it("1000원 미만 금액은 로또를 0개 팔 수 있다", () => {
      expect(calculateLotto(100)).to.be.equal(0);
    });
    it("3000원 금액은 로또를 3개 팔 수 있다", () => {
      expect(calculateLotto(3000)).to.be.equal(3);
    });
  });

  describe("매칭된 갯수에 따라 정해진 당첨금액을 리턴한다.", () => {
    describe("매칭된 갯수가 3개일 때", () => {
      it("당첨금은 5000원이다.", () => {
        expect(calculateProfit({ matchedCount: 3 })).to.be.equal(5000);
      });
    });

    describe("매칭된 갯수가 4개일 때", () => {
      it("당첨금은 50000원이다.", () => {
        expect(calculateProfit({ matchedCount: 4 })).to.be.equal(50_000);
      });
    });
    describe("매칭된 갯수가 5개일 때", () => {
      it("당첨금은 1500000원이다.", () => {
        expect(calculateProfit({ matchedCount: 5 })).to.be.equal(1_500_000);
      });
    });
    describe("매칭된 갯수가 5개이면서 보너스 번호가 포함되면", () => {
      it("당첨금은 30000000원이다.", () => {
        expect(calculateProfit({ matchedCount: 5, isIncludeBonus: true })).to.be.equal(30_000_000);
      });
    });
    describe("매칭된 갯수가 6개일 때", () => {
      it("당첨금은 2000000000원이다.", () => {
        expect(calculateProfit({ matchedCount: 6 })).to.be.equal(2_000_000_000);
      });
    });
  })
});
