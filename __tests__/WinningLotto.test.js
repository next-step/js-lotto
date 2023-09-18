import WinningLotto from "../src/js/domain/models/WinningLotto";
import {
  BonusNumberNotNumberError,
  BonusNumberOutOfRangeError,
  BonusNumberDuplicatedError,
} from "../src/js/domain/models/WinningLotto/errors";
import {
  LottoNumbersNotArrayError,
  LottoNumbersLengthNotSixError,
  LottoNumberNotNumberError,
  LottoNumberOutOfRangeError,
  LottoNumberDuplicatedError,
} from "../src/js/domain/models/Lotto/errors";
import Lotto from "../src/js/domain/models/Lotto";
import Rank from "../src/js/domain/models/Rank";

describe("WinningLotto 생성자 테스트", () => {
  describe("LottoNumbers 유효성 검사 테스트", () => {
    describe("배열 형태가 아니면, 에러를 발생시킨다.", () => {
      it.each([1, "erica", true, null, undefined, function () {}, {}])(
        "%p",
        (lottoNumbers) => {
          expect(() => new WinningLotto(lottoNumbers, 7)).toThrow(
            LottoNumbersNotArrayError
          );
        }
      );
    });

    describe("배열 길이가 6이 아니라면, 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: [] },
        { lottoNumbers: [1, 2, 3, 4, 5] },
        { lottoNumbers: [1, 2, 3, 4, 5, 6, 7] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new WinningLotto(lottoNumbers, 8)).toThrow(
          LottoNumbersLengthNotSixError
        );
      });
    });

    describe("요소가 숫자가 아니면 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: ["erica", 1, 1, 1, 1, 1] },
        { lottoNumbers: [" ", 1, 1, 1, 1, 1] },
        { lottoNumbers: ["", 1, 1, 1, 1, 1] },
        { lottoNumbers: ["1", 1, 1, 1, 1, 1] },
        { lottoNumbers: [true, 1, 1, 1, 1, 1] },
        { lottoNumbers: [null, 1, 1, 1, 1, 1] },
        { lottoNumbers: [undefined, 1, 1, 1, 1, 1] },
        { lottoNumbers: [function () {}, 1, 1, 1, 1, 1] },
        { lottoNumbers: [{}, 1, 1, 1, 1, 1] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new WinningLotto(lottoNumbers, 7)).toThrow(
          LottoNumberNotNumberError
        );
      });
    });

    describe("요소 중 [1, 7]를 벗어난 숫자가 있다면, 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: [-1, 2, 3, 4, 5, 6] },
        { lottoNumbers: [0, 2, 3, 4, 5, 6] },
        { lottoNumbers: [1, 2, 3, 4, 5, 46] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new WinningLotto(lottoNumbers, 7)).toThrow(
          LottoNumberOutOfRangeError
        );
      });
    });

    describe("요소 중 중복된 숫자가 있다면, 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: [1, 1, 1, 1, 1, 1] },
        { lottoNumbers: [1, 2, 3, 4, 5, 5] },
        { lottoNumbers: [1, 2, 3, 4, 5, 1] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new WinningLotto(lottoNumbers, 7)).toThrow(
          LottoNumberDuplicatedError
        );
      });
    });

    describe("유효하면, 에러를 발생시키지 않는다.", () => {
      it.each([
        { lottoNumbers: [1, 2, 3, 4, 5, 6] },
        { lottoNumbers: [1, 2, 3, 4, 5, 45] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new WinningLotto(lottoNumbers, 7)).not.toThrow();
      });
    });
  });

  describe("BonusNumber 유효성 검사 테스트", () => {
    describe("보너스 번호가 숫자 형태가 아니면, 에러를 발생시킨다.", () => {
      it.each(["1", "erica", true, null, undefined, function () {}, {}])(
        "%p",
        (input) => {
          expect(() => new WinningLotto([1, 2, 3, 4, 5, 6], input)).toThrow(
            BonusNumberNotNumberError
          );
        }
      );
    });

    describe("보너스 번호가 [1, 45] 범위를 벗어난 숫자면, 에러를 발생시킨다.", () => {
      it.each([-1, 0, 46])("%p", (input) => {
        expect(() => new WinningLotto([1, 2, 3, 4, 5, 6], input)).toThrow(
          BonusNumberOutOfRangeError
        );
      });
    });

    describe("당첨 번호와 보너스 번호가 중복되면, 에러를 발생시킨다.", () => {
      it("당첨 번호와 보너스 번호가 중복되면, 에러를 발생시킨다.", () => {
        expect(() => new WinningLotto([1, 2, 3, 4, 5, 6], 1)).toThrow(
          BonusNumberDuplicatedError
        );
      });
    });
  });
});

describe("checkRank(targetLotto) 테스트", () => {
  describe("올바른 Rank 객체를 반환한다.", () => {
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
    const testCases = [
      {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        rank: 1,
      },
      {
        lottoNumbers: [1, 2, 3, 4, 5, 7],
        rank: 2,
      },
      {
        lottoNumbers: [1, 2, 3, 4, 5, 16],
        rank: 3,
      },
      {
        lottoNumbers: [1, 2, 3, 4, 15, 16],
        rank: 4,
      },
      {
        lottoNumbers: [1, 2, 3, 4, 15, 7],
        rank: 4,
      },
      {
        lottoNumbers: [1, 2, 3, 14, 15, 16],
        rank: 5,
      },
      {
        lottoNumbers: [1, 2, 3, 14, 15, 7],
        rank: 5,
      },
      {
        lottoNumbers: [1, 2, 13, 14, 15, 16],
        rank: 6,
      },
      {
        lottoNumbers: [1, 2, 13, 14, 15, 7],
        rank: 6,
      },
      {
        lottoNumbers: [1, 12, 13, 14, 15, 16],
        rank: 6,
      },
      {
        lottoNumbers: [1, 12, 13, 14, 15, 7],
        rank: 6,
      },
      {
        lottoNumbers: [11, 12, 13, 14, 15, 16],
        rank: 6,
      },
      {
        lottoNumbers: [11, 12, 13, 14, 15, 7],
        rank: 6,
      },
    ];

    it.each(testCases)(
      "lottoNumbers: $lottoNumbers, rank: $rank",
      ({ lottoNumbers, rank }) => {
        const targetLotto = Lotto.of(lottoNumbers);
        const expectedRank = Rank.of(rank);
        expect(winningLotto.getRank(targetLotto)).toEqual(expectedRank);
      }
    );
  });
});
