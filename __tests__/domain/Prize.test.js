import WinningLotto from "../../src/domain/WinningLotto.js";
import LottoNumber from "../../src/domain/LottoNumber.js";
import Lotto from "../../src/domain/Lotto.js";
import FirstPrize from "../../src/domain/prize/FirstPrize.js";
import SecondPrize from "../../src/domain/prize/SecondPrize.js";
import ThirdPrize from "../../src/domain/prize/ThirdPrize.js";
import FifthPrize from "../../src/domain/prize/FifthPrize.js";
import FourthPrize from "../../src/domain/prize/FourthPrize.js";

describe("당첨 클래스", () => {
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
      const prize = new FirstPrize();
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
      const prize = new FirstPrize();
      expect(prize.matched(lotto, winningLotto)).toBe(false);
    });
    it("1등 당첨금을 반환해야한다", () => {
      expect(new FirstPrize().prizeAmount).toBe(2000_000_000);
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
      const prize = new SecondPrize();
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
      const prize = new SecondPrize();
      expect(prize.matched(lotto, winningLotto)).toBeFalsy();
    });
    it("2등 당첨금을 반환해야한다", () => {
      expect(new SecondPrize().prizeAmount).toBe(30_000_000);
    });
  });

  describe("> ThirdPrize (3등)은 ", () => {
    it("로또와 당첨로또를 비교하여 5개 일치하고 보너스가 다를시 true를 반환해야한다", () => {
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(8),
      ]);
      const prize = new ThirdPrize();
      expect(prize.matched(lotto, winningLotto)).toBeTruthy();
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
      const prize = new FourthPrize();
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
      const prize = new FourthPrize();
      expect(prize.matched(lotto, winningLotto)).toBe(false);
    });
    it("4등 당첨금을 반환해야 한다", () => {
      expect(new FourthPrize().prizeAmount).toBe(50_000);
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
      const prize = new FifthPrize();
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
      const prize = new FifthPrize();
      expect(prize.matched(lotto, winningLotto)).toBe(false);
    });
    it("5등 당첨금을 반환해야 한다", () => {
      expect(new FifthPrize().prizeAmount).toBe(5_000);
    });
  });
});
