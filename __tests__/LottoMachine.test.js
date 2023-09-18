import LottoMachine from "../src/js/domain/models/LottoMachine";
import {
  PurchasingPriceNotNumberError,
  PurchasingPriceIsNegativeError,
  PurchasingPriceLessLowerBoundError,
  PurchasingPriceAboveUpperBoundError,
} from "../src/js/domain/models/LottoMachine/errors";
import Lotto from "../src/js/domain/models/Lotto";

describe("purchasingPrice 내에서 구매할 수 있는 최대 개수의 Lotto를 발행한다.", () => {
  const lottoMachine = new LottoMachine();
  describe("issueLottoOf(purchasingPrice) 테스트", () => {
    describe("purchasingPrice 유효성 검사 테스트", () => {
      describe("구매 금액이 숫자 형태가 아닌 경우, 에러를 발생시킨다.", () => {
        it.each(["1", "erica", true, null, undefined, function () {}, {}, []])(
          "purchasingPrice: %p",
          (purchasingPrice) => {
            expect(() => lottoMachine.issueLottoOf(purchasingPrice)).toThrow(
              PurchasingPriceNotNumberError
            );
          }
        );
      });

      describe("구매 금액이 음수인 경우, 에러를 발생시킨다.", () => {
        it.each([-100000, -10000, -1000])(
          "purchasingPrice: %p",
          (purchasingPrice) => {
            expect(() => lottoMachine.issueLottoOf(purchasingPrice)).toThrow(
              PurchasingPriceIsNegativeError
            );
          }
        );
      });

      describe("한 장도 구매할 수 없는 경우, 에러를 발생시킨다.", () => {
        it.each([0, 999])("purchasingPrice: %p", (purchasingPrice) => {
          expect(() => lottoMachine.issueLottoOf(purchasingPrice)).toThrow(
            PurchasingPriceLessLowerBoundError
          );
        });
      });

      describe("구매액이 10만원 초과인 경우, 에러를 발생시킨다.", () => {
        it.each([100_001, 150_000])(
          "purchasingPrice: %p",
          (purchasingPrice) => {
            expect(() => lottoMachine.issueLottoOf(purchasingPrice)).toThrow(
              PurchasingPriceAboveUpperBoundError
            );
          }
        );
      });

      describe("그 외의 경우, 에러를 발생시키지 않는다.", () => {
        it.each([1_000, 99_999])("purchasingPrice: %p", (purchasingPrice) => {
          expect(() =>
            lottoMachine.issueLottoOf(purchasingPrice)
          ).not.toThrow();
        });
      });
    });
  });

  describe("purchasingPrice로 구매 가능한 최대 개수의 Lotto를 발행한다.", () => {
    const testCases = [
      { purchasingPrice: 1_000, issueAmount: 1 },
      { purchasingPrice: 5_000, issueAmount: 5 },
      { purchasingPrice: 11_111, issueAmount: 11 },
      { purchasingPrice: 99_999, issueAmount: 99 },
      { purchasingPrice: 100_000, issueAmount: 100 },
    ];
    it.each(testCases)(
      "purchasingPrice: $purchasingPrice, issueAmount: $issueAmount",
      ({ purchasingPrice, issueAmount }) => {
        const issuedLottos = lottoMachine.issueLottoOf(purchasingPrice);
        expect(issuedLottos.length).toBe(issueAmount);
        issuedLottos.forEach((lotto) => expect(lotto).toBeInstanceOf(Lotto));
      }
    );
  });
});
