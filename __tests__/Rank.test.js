import Rank from "../src/js/Rank";
import { RankNotNumberError, RankOutOfRangeError } from "../src/js/Rank/errors";

describe("Rank 생성자 테스트", () => {
  describe("Rank 유효성 테스트", () => {
    // 숫자가 아닌 경우
    describe("순위가 숫자 형태가 아니면, 에러를 발생시킨다.", () => {
      it.each(["1", "erica", true, null, undefined, function () {}, {}, []])(
        "rank: %p",
        (rank) => {
          expect(() => new Rank(rank)).toThrow(RankNotNumberError);
        }
      );
    });

    // 1-6 사이의 숫자가 아닌 경우
    describe("순위가 [1, 6] 사이를 벗어나면, 에러를 발생시킨다.", () => {
      it.each([0, 7])("rank: %p", (rank) => {
        expect(() => new Rank(rank)).toThrow(RankOutOfRangeError);
      });
    });

    // 그 외는 오류 X
    describe("순위가 유효한 경우, 에러를 발생시키지 않는다.", () => {
      it.each([1, 2, 3, 4, 5, 6])("rank: %p", (rank) => {
        expect(() => new Rank(rank)).not.toThrow();
      });
    });
  });
});

describe("static of() 테스트", () => {
  describe("Rank 객체를 반환한다.", () => {
    it.each([1, 6])("rank: %p", (rank) => {
      expect(Rank.of(rank)).toBeInstanceOf(Rank);
    });
  });
});

describe("getPrize() 테스트", () => {
  describe("순위에 맞는 올바른 prize를 반환한다.", () => {
    const testCases = [
      { rank: 1, prize: 2_000_000_000 },
      { rank: 2, prize: 30_000_000 },
      { rank: 3, prize: 1_500_000 },
      { rank: 4, prize: 50_000 },
      { rank: 5, prize: 5_000 },
      { rank: 6, prize: 0 },
    ];

    it.each(testCases)("rank: %rank, prize: $prize", ({ rank, prize }) => {
      expect(new Rank(rank).getPrize()).toBe(prize);
    });
  });
});
