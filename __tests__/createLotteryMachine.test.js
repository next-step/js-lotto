import createLotteryMachine from "../src/js/domain/LotteryMachine/createLotteryMachine";
import {
  PurchasingPriceNotNumberError,
  PurchasingPriceShouldAboveZeroError,
  PurchasingPriceNotIntegerError,
  PurchasingPriceUpperLimitError,
} from "../src/js/domain/LotteryMachine/errors";
import Lotto from "../src/js/domain/Lotto";

const { issueLottosWith } = createLotteryMachine();

describe("로또 발행 테스트", () => {
  describe("로또 구매 금액 유효성 테스트", () => {
    describe("숫자 형태가 아니라면, 에러를 발생시킨다.", () => {
      it.each(["1", "erica", true, null, undefined, function () {}, {}])(
        "%p",
        (purchasingPrice) => {
          expect(() => issueLottosWith(purchasingPrice)).toThrow(
            PurchasingPriceNotNumberError
          );
        }
      );
    });

    describe("0이나 음수라면, 에러를 발생시킨다.", () => {
      it.each([0, -1_000, -5_000])("%p", (purchasingPrice) => {
        expect(() => issueLottosWith(purchasingPrice)).toThrow(
          PurchasingPriceShouldAboveZeroError
        );
      });
    });

    describe("정수가 아니라면, 에러를 발생시킨다.", () => {
      it.each([1_000.5, 5_000.05])("%p", (purchasingPrice) => {
        expect(() => issueLottosWith(purchasingPrice)).toThrow(
          PurchasingPriceNotIntegerError
        );
      });
    });

    describe("10만원 초과라면, 에러를 발생시킨다.", () => {
      it.each([100_001, 1_000_000])("%p", (purchasingPrice) => {
        expect(() => issueLottosWith(purchasingPrice)).toThrow(
          PurchasingPriceUpperLimitError
        );
      });
    });

    describe("유효하면, 에러를 발생시키지 않는다.", () => {
      it.each([1, 1_000, 5_000, 10_000, 100_000])("%p", (purchasingPrice) => {
        expect(() => issueLottosWith(purchasingPrice)).not.toThrow();
      });
    });
  });

  describe("로또 배열 반환 테스트", () => {
    describe("구매 가능한 개수가 없으면 빈 배열을 반환한다.", () => {
      it.each([1, 999])("%p", (purchasingPrice) => {
        expect(issueLottosWith(purchasingPrice)).toEqual([]);
      });
    });

    describe("주어진 금액에서 구매 가능한 최대 수의 로또를 구매한다.", () => {
      it.each([1_000, 1_500, 2_000, 9_999, 100_000])(
        "%p",
        (purchasingPrice) => {
          expect(issueLottosWith(purchasingPrice).length).toEqual(
            Math.floor(purchasingPrice / 1_000)
          );
        }
      );
    });

    describe("구매 가능하면 로또 배열을 반환한다.", () => {
      it.each([1_000, 1_500, 2_000, 9_999, 100_000])(
        "%p",
        (purchasingPrice) => {
          const lottos = issueLottosWith(purchasingPrice);

          lottos.forEach((lotto) => expect(lotto).toBeInstanceOf(Lotto));
        }
      );
    });
  });
});
