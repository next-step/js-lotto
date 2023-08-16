import LotteryPlatform from "../src/js/LotteryPlatform";
import Lotto from "../src/js/Lotto";
import MatchingChecker from "../src/js/MatchingChecker";

const ERROR_MESSAGE = LotteryPlatform.ERROR_MESSAGE;

describe("로또 발행 요청 테스트", () => {
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
  it("로또 번호 반환 메소드를 호출한다.", () => {
    const spyGetLottoNumbers = jest.spyOn(Lotto.prototype, "getLottoNumbers");
    LotteryPlatform.getLottoNumbers();
    expect(spyGetLottoNumbers).toHaveBeenCalledTimes(1);
  });

  it("반환값은 6개의 숫자로 이뤄진 배열이다.", () => {
    const lotto = LotteryPlatform.getLottoNumbers();
    expect(lotto).toBeInstanceOf(Array);
    expect(lotto.length).toBe(6);
    expect(lotto.every((number) => typeof number === "number")).toBe(true);
  });
});

describe("로또 당첨 번호, 보너스 번호 설정 요청 테스트", () => {
  const spySetWinningNumbers = jest.spyOn(MatchingChecker, "setWinningNumbers");
  const spySetBonusNumber = jest.spyOn(MatchingChecker, "setBonusNumber");
  LotteryPlatform.setUpMatchingChecker([1, 2, 3, 4, 5, 6], 7);

  it("MatchingChecker에 당첨 번호 설정 요청을 보낸다.", () => {
    expect(spySetWinningNumbers).toHaveBeenCalledTimes(1);
    expect(spySetWinningNumbers).toHaveBeenCalledWith([1, 2, 3, 4, 5, 6]);
  });

  it("MatchingChecker에 보너스 번호 설정 요청을 보낸다.", () => {
    expect(spySetBonusNumber).toHaveBeenCalledTimes(1);
    expect(spySetBonusNumber).toHaveBeenCalledWith(7);
  });
});

describe("로또 당첨 확인 요청 테스트", () => {
  LotteryPlatform.clearLotto();
  LotteryPlatform.issueLottoOf(1);

  it("저장한 lotto를 인자로 로또 당첨 확인을 요청한다.", () => {
    const spySetMatchInfo = jest.spyOn(MatchingChecker, "setMatchInfo");
    LotteryPlatform.requestMatchCheck(LotteryPlatform.getLotto());
    expect(spySetMatchInfo).toHaveBeenCalledTimes(1);
    expect(spySetMatchInfo).toHaveBeenCalledWith(LotteryPlatform.getLotto());
  });
});

describe("발행 로또 당첨 여부, 당첨 등수, 당첨 금액 반환 테스트", () => {
  // TODO null 예외처리
  // TODO MatchBonus 변수명 변경

  it("로또 당첨 번호 일치 개수 반환 메소드를 호출한다.", () => {
    const spyGetMatchCount = jest.spyOn(Lotto.prototype, "getMatchCount");
    LotteryPlatform.getMatchResult();
    expect(spyGetMatchCount).toHaveBeenCalledTimes(1);
  });

  it("로또 보너스 번호 반환 메소드를 호출한다.", () => {
    const spyGetMatchBonus = jest.spyOn(Lotto.prototype, "getMatchBonus");
    LotteryPlatform.getMatchResult();
    expect(spyGetMatchBonus).toHaveBeenCalledTimes(1);
  });

  it("등수와 당첨 금액을 속성으로 가진 객체를 반환한다.", () => {
    expect(LotteryPlatform.getMatchResult()).toHaveProperty("rank");
    expect(LotteryPlatform.getMatchResult()).toHaveProperty("prize");
  });

  // TODO 여기서 체크할 필요가 있는지
  // it.each([])('올바른 로또 등수와 당첨 번호를 반환한다.', () => {
  // })
});
