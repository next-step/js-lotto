import LottoTicketRules from "../class/LottoTicketRules.js";

describe("LottoTicketRules 클래스 테스트", () => {
  test.each`
    min  | max   | length
    ${0} | ${43} | ${6}
    ${1} | ${0}  | ${6}
    ${1} | ${43} | ${0}
  `(
    "최소값: $min, 최대값: $max, 번호개수 : $length로 설정하면 에러가 발생한다.",
    ({ min, max, length }) => {
      expect(() => new LottoTicketRules(min, max, length)).toThrowError(
        "최소값, 최대값, 개수는 양의 정수여야 합니다.",
      );
    },
  );

  test("최소값이 최대값보다 크면 에러가 발생한다.", () => {
    expect(() => new LottoTicketRules(43, 1, 6)).toThrowError(
      "최소값은 최대값보다 작아야 합니다.",
    );
  });

  test("지정한 범위보다 많은 번호 개수를 설정하면 에러가 발생한다", () => {
    expect(() => new LottoTicketRules(1, 43, 44)).toThrowError(
      "설정할 수 있는 번호 개수를 초과하였습니다.",
    );
  });
});
