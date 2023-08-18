import createLotteryMachine from "../src/js/domain/LotteryMachine";
import { FixedIssueStrategy } from "../src/js/domain/LotteryMachine/IssueStrategy";
import Lotto from "../src/js/domain/Lotto";
import {
  PurchasingNotNumberError,
  PurchasingShouldAboveZeroError,
  PurchasingNotIntegerError,
} from "../src/js/domain/LotteryMachine/errors";
const { issueLotto } = createLotteryMachine();

describe("로또 발행 테스트", () => {
  describe("로또 구매 금액 유효성 테스트", () => {
    describe("숫자가 아니라면, 에러를 발생시킨다.", () => {
      it.each(["1", "erica", true, null, undefined, function () {}, {}])(
        "%p",
        (purchasing) => {
          expect(() => issueLotto(purchasing)).toThrow(
            PurchasingNotNumberError
          );
        }
      );
    });

    describe("0이나 음수라면, 에러를 발생시킨다.", () => {
      it.each([0, -1_000, -5_000])("%p", (purchasing) => {
        expect(() => issueLotto(purchasing)).toThrow(
          PurchasingShouldAboveZeroError
        );
      });
    });

    describe("정수가 아니라면, 에러를 발생시킨다.", () => {
      it.each([1_000.5, 5_000.05])("%p", (purchasing) => {
        expect(() => issueLotto(purchasing)).toThrow(PurchasingNotIntegerError);
      });
    });

    // describe("10만원 이상이라면, 에러를 발생시킨다.", () => {});

    describe("유효하면, 에러를 발생시키지 않는다.", () => {
      it.each([1, 1_000, 5_000, 10_000, 99_999])("%p", (purchasing) => {
        expect(() => issueLotto(purchasing)).not.toThrow();
      });
    });
  });

  // const lotto = issueLotto(new FixedIssueStrategy([1, 2, 3, 4, 5, 6]));

  // it("Lotto 객체를 반환한다.", () => {
  //   expect(lotto).toBeInstanceOf(Lotto);
  // });
});
