import LotteryPlatform from "../src/js/LotteryPlatform";
import Lotto from "../src/js/Lotto";

const ERROR_MESSAGE = LotteryPlatform.ERROR_MESSAGE;

describe.skip("로또 발행 요청 테스트", () => {
  describe("발행 개수 유효성 테스트", () => {
    it.each(["1", "erica", true, null, undefined, function () {}, {}])(
      "숫자 형태가 아닌 경우, 에러를 반환한다.",
      (input) => {
        expect(() => LotteryPlatform.issueLottoOf(input)).toThrow(
          ERROR_MESSAGE.NOT_NUMBER
        );
      }
    );

    it.each([-1, 0])("0 이하인 경우, 에러를 반환한다.", (input) => {
      expect(() => LotteryPlatform.issueLottoOf(input)).toThrow(
        ERROR_MESSAGE.NOT_POSITIVE
      );
    });

    it.each([0.5, 1.5])("정수 형태가 아닌 경우, 에러를 반환한다.", (input) => {
      expect(() => LotteryPlatform.issueLottoOf(input)).toThrow(
        ERROR_MESSAGE.NOT_INTEGER
      );
    });

    // 도메인 지식
    // it("10 초과인 경우, 에러를 반환한다.", (input) => {
    //   expect(() => LotteryPlatform.issueLottoOf(input)).toThrow(
    //     ERROR_MESSAGE.NOT_NUMBER
    //   );
    // });

    it.each([1, 1.0, 10])(
      "올바른 형태이면, 에러를 발생시키지 않는다.",
      (input) => {
        expect(() => LotteryPlatform.issueLottoOf(input)).not.toThrow();
      }
    );
  });

  describe("로또 발행 테스트", () => {
    beforeEach(() => {
      LotteryPlatform.clearLotto();
      LotteryPlatform.issueLottoOf(1);
    });

    // it("로또를 1개 발행한다.", () => {
    //   expect(LotteryPlatform.getLotto()).toBe(1);
    // });

    it("발행 로또는 로또 인스턴스이다.", () => {
      expect(LotteryPlatform.getLotto()).toBeInstanceOf(Lotto);
    });
  });
});

describe("발행 로또 번호 반환 테스트", () => {
  // TODO 외부에서 고정 로또 번호 전략 주입받으면 테스트 코드 변경
  it("발행 로또 번호는 숫자 6개로 구성된 배열 형태이다.", () => {
    LotteryPlatform.issueLottoOf(1);
    const lotto = LotteryPlatform.getLotto();
    const lottoNumbers = lotto.getLottoNumbers();
    expect(lottoNumbers).toBeInstanceOf(Array);
    expect(lottoNumbers.some((num) => typeof num !== "number")).toBe(false);
  });
});

// describe("로또 당첨 확인 요청 테스트", () => {});

// describe("발행 로또 당첨 여부, 당첨 등수, 당첨 금액 반환 테스트", () => {});
