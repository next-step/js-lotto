import WinningLotto from "../../src/domain/WinningLotto.js";
import LottoNumber from "../../src/domain/LottoNumber.js";
import Lotto from "../../src/domain/Lotto.js";
import Prize from "../../src/domain/prize/Prize.js";
import {
  bonusMatchingStrategy,
  defaultMatchingStrategy,
  nonBonusMatchingStrategy,
} from "../../src/domain/prize/matchingStrategies.js";

describe("Prize 클래스는", () => {
  let winningLotto;
  beforeEach(() => {
    const winningNumbers = [
      new LottoNumber(1),
      new LottoNumber(2),
      new LottoNumber(3),
      new LottoNumber(4),
      new LottoNumber(5),
      new LottoNumber(6),
    ];
    winningLotto = new WinningLotto(winningNumbers, new LottoNumber(7));
  });

  describe("> FirstPrize (1등)은 ", () => {
    it("로또와 당첨로또를 비교하여 모두 일치시 true를 반환해야한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(6),
      ]);
      const prize = new Prize(2000000000, defaultMatchingStrategy(6));
      expect(prize.matched(lotto, winningLotto)).toBe(true);
    });
    it("로또와 당첨로또가 다르면 false를 반환해야한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(7),
      ]);
      const prize = new Prize(2000000000, defaultMatchingStrategy(6));
      expect(prize.matched(lotto, winningLotto)).toBe(false);
    });
    it("1등 당첨금을 반환해야한다", () => {
      expect(
        new Prize(2000000000, defaultMatchingStrategy(6)).prizeAmount,
      ).toBe(2000000000);
    });
  });

  describe("> SecondPrize (2등)은 ", () => {
    it("로또와 당첨로또를 비교하여 5개 일치하고 보너스 일치시 true를 반환해야한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(7),
      ]);
      const prize = new Prize(30000000, bonusMatchingStrategy(5));
      expect(prize.matched(lotto, winningLotto)).toBeTruthy();
    });
    it("로또와 당첨로또가 다르면 false를 반환해야한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(8),
      ]);
      const prize = new Prize(30000000, bonusMatchingStrategy(5));
      expect(prize.matched(lotto, winningLotto)).toBeFalsy();
    });
    it("2등 당첨금을 반환해야한다", () => {
      expect(new Prize(30000000, bonusMatchingStrategy(5)).prizeAmount).toBe(
        30000000,
      );
    });
  });

  describe("> ThirdPrize (3등)은 ", () => {
    it("로또와 당첨로또를 비교하여 5개 일치하고 보너스가 다를 시 true를 반환해야한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(8),
      ]);
      const prize = new Prize(1500000, nonBonusMatchingStrategy(5));
      expect(prize.matched(lotto, winningLotto)).toBeTruthy();
    });
    it("3등 당첨금을 반환해야한다", () => {
      expect(new Prize(1500000, nonBonusMatchingStrategy(5)).prizeAmount).toBe(
        1500000,
      );
    });
  });

  describe("> FourthPrize (4등)은 ", () => {
    it("로또와 당첨로또를 비교하여, 4개 일치시 true를 반환해야 한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(10),
        new LottoNumber(11),
      ]);
      const prize = new Prize(50000, defaultMatchingStrategy(4));
      expect(prize.matched(lotto, winningLotto)).toBe(true);
    });
    it("로또와 당첨로또가 4개 미만 또는 초과로 일치하면 false를 반환해야 한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(10),
        new LottoNumber(11),
        new LottoNumber(12),
      ]);
      const prize = new Prize(50000, defaultMatchingStrategy(4));
      expect(prize.matched(lotto, winningLotto)).toBe(false);
    });
    it("4등 당첨금을 반환해야 한다", () => {
      expect(new Prize(50000, defaultMatchingStrategy(4)).prizeAmount).toBe(
        50000,
      );
    });
  });

  describe("> FifthPrize (5등)은 ", () => {
    it("로또와 당첨로또를 비교하여, 3개 일치시 true를 반환해야 한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(10),
        new LottoNumber(11),
        new LottoNumber(12),
      ]);
      const prize = new Prize(5000, defaultMatchingStrategy(3));
      expect(prize.matched(lotto, winningLotto)).toBe(true);
    });
    it("로또와 당첨로또가 3개 미만이면 false를 반환해야 한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(10),
        new LottoNumber(11),
        new LottoNumber(12),
        new LottoNumber(13),
      ]);
      const prize = new Prize(5000, defaultMatchingStrategy(3));
      expect(prize.matched(lotto, winningLotto)).toBe(false);
    });
    it("5등 당첨금을 반환해야 한다", () => {
      expect(new Prize(5000, defaultMatchingStrategy(3)).prizeAmount).toBe(
        5000,
      );
    });
  });
});
