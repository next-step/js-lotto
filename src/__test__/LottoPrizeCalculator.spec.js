import LottoPrizeCalculator from "../class/LottoPrizeCalculator";

describe("LottoPrizeCalculator 클래스 테스트", () => {
  let calculator;

  beforeEach(() => {
    calculator = new LottoPrizeCalculator();
  });

  test("로또 번호 배열길이가 LottoTicketRules의 length와 일치하지 않으면 에러를 반환한다.", () => {
    expect(() => calculator.calculatePrize([1, 2, 3, 4, 5])).toThrowError(
      "로또 번호의 개수가 규칙과 일치하지 않습니다.",
    );
  });

  test("로또 번호 배열 원소가 정수가 아닌 경우 에러를 반환한다.", () => {
    expect(() => calculator.calculatePrize([1, 2, 3, 4, 5.5, 6])).toThrowError(
      "로또는 정수로 이루어져야 합니다.",
    );
  });

  test("로또 번호 배열 원소가 범위를 벗아난 경우 에러를 반환한다.", () => {
    expect(() => calculator.calculatePrize([1, 2, 3, 4, 5, 100])).toThrowError(
      "로또 번호가 규칙의 범위를 벗어납니다.",
    );
  });

  test("로또 번호 배열의 원소가 규칙의 범위를 벗어난 경우 에러를 반환한다.", () => {
    expect(() => calculator.calculatePrize([1, 2, 3, 4, 5, 100])).toThrowError(
      "로또 번호가 규칙의 범위를 벗어납니다.",
    );
  });

  test("로또 번호가 중복되면 에러를 반환한다.", () => {
    expect(() => calculator.calculatePrize([1, 2, 3, 4, 5, 5])).toThrowError(
      "로또 번호는 중복될 수 없습니다.",
    );
  });

  test("당첨 번호 배열길이가 LottoTicketRules의 length와 일치하지 않으면 에러를 반환한다.", () => {
    expect(() => (calculator.winningNumbers = [1, 2, 3, 4, 5])).toThrowError(
      "당첨 번호의 개수가 규칙과 일치하지 않습니다.",
    );
  });

  test("당첨 번호 배열 원소가 정수가 아닌 경우 에러를 반환한다.", () => {
    expect(
      () => (calculator.winningNumbers = [1, 2, 3, 4, 5.5, 6]),
    ).toThrowError("당첨 번호는 정수로 이루어져야 합니다.");
  });

  test("당첨 번호 배열의 원소가 규칙의 범위를 벗어난 경우 에러를 반환한다.", () => {
    expect(
      () => (calculator.winningNumbers = [1, 2, 3, 4, 5, 100]),
    ).toThrowError("당첨 번호가 규칙의 범위를 벗어납니다.");
  });

  test("당첨 번호가 중복되면 에러를 반환한다.", () => {
    expect(() => (calculator.winningNumbers = [1, 2, 3, 4, 5, 5])).toThrowError(
      "당첨 번호는 중복될 수 없습니다.",
    );
  });

  test("보너스 번호가 정수가 아닌 경우 에러를 반환한다.", () => {
    expect(() => (calculator.bonusNumber = 5.5)).toThrowError(
      "보너스번호는 정수이어야 합니다",
    );
  });

  test("보너스 번호가 규칙의 범위를 벗어난 경우 에러를 반환한다.", () => {
    expect(() => (calculator.bonusNumber = 100)).toThrowError(
      "보너스 번호가 규칙의 범위를 벗어납니다.",
    );
  });

  test("주어진 로또 번호에 대해 올바른 상금 정보를 반환한다.", () => {
    calculator.winningNumbers = [1, 2, 3, 4, 5, 6];
    calculator.bonusNumber = 7;

    expect(calculator.calculatePrize([1, 2, 3, 4, 5, 7])).toEqual({
      rank: 2,
      requiresBonusNumber: true,
      matchingNumberCount: 5,
      prizeAmount: 30000000,
    });
  });
});
