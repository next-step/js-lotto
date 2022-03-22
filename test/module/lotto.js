import { describe, it, expect } from "vitest";
import { calculateLotto, drawLots } from "../../src/js/module/lotto";

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
});
