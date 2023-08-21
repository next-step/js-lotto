import LottoPrizeRules from "../class/LottoPrizeRules";

const makeLottoPrizeRule = (
  rank,
  matchingNumberCount,
  requiresBonusNumber,
  prizeAmount,
) => ({ rank, requiresBonusNumber, matchingNumberCount, prizeAmount });

describe("LottoPrizeRules 클래스 테스트", () => {
  test("규칙 형식에 맞지 않는 초기값을 전달하면 기본값으로 설정된다.", () => {
    const prizeRules = new LottoPrizeRules([makeLottoPrizeRule(1, 6, false)]);

    expect(prizeRules.rules).toBe(prizeRules.defaultRules);
  });

  test.each([-1, 2])(
    "matchingNumberCount가 $d 이면 에러가 발생한다.",
    (matchingNumberCount) => {
      expect(
        () =>
          new LottoPrizeRules([
            makeLottoPrizeRule(1, matchingNumberCount, false, 100),
          ]),
      ).toThrowError("번호 일치 개수의 형식이 올바르지 않습니다.");
    },
  );

  test("rank가 1이상의 양의 정수가 아니면 에러가 발생한다.", () => {
    expect(
      () => new LottoPrizeRules([makeLottoPrizeRule(0, 6, false, 100)]),
    ).toThrowError("등수의 형식이 올바르지 않습니다.");
  });

  test("rank 가 중복되면 에러가 발생한다.", () => {
    expect(
      () =>
        new LottoPrizeRules([
          makeLottoPrizeRule(1, 6, false, 100),
          makeLottoPrizeRule(1, 5, true, 100),
        ]),
    ).toThrowError("규칙의 등수는 중복될 수 없습니다.");
  });

  test("rule getter로 조회시 올바른 규칙이 반환된다.", () => {
    const prizeRules = new LottoPrizeRules();

    expect(prizeRules.getSingleRule(2)).toEqual({
      rank: 2,
      requiresBonusNumber: true,
      matchingNumberCount: 5,
      prizeAmount: 30000000,
    });
  });

  test("rule getter로 존재하지 않는 규칙 조회시 에러가 반환된다.", () => {
    const prizeRules = new LottoPrizeRules();

    expect(prizeRules.getSingleRule(7)).toThrowError(
      "존재하지 않는 규칙입니다.",
    );
  });
});
