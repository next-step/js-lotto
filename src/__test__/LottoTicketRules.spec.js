import LottoTicketRules from "../class/LottoTicketRules.js";

describe("LottoTicketRules 클래스 테스트", () => {
  const LOTTO_DEFAULT_VALUE = Object.freeze({ MIN: 1, MAX: 43, LENGTH: 6 });

  test.each`
    min                        | max                        | length                        | expectedMin                | expectedMax                | expectedLength
    ${LOTTO_DEFAULT_VALUE.MIN} | ${LOTTO_DEFAULT_VALUE.MAX} | ${LOTTO_DEFAULT_VALUE.LENGTH} | ${LOTTO_DEFAULT_VALUE.MIN} | ${LOTTO_DEFAULT_VALUE.MAX} | ${LOTTO_DEFAULT_VALUE.LENGTH}
    ${LOTTO_DEFAULT_VALUE.MIN} | ${LOTTO_DEFAULT_VALUE.MAX} | ${0}                          | ${LOTTO_DEFAULT_VALUE.MIN} | ${LOTTO_DEFAULT_VALUE.MAX} | ${LOTTO_DEFAULT_VALUE.LENGTH}
    ${0}                       | ${LOTTO_DEFAULT_VALUE.MAX} | ${LOTTO_DEFAULT_VALUE.LENGTH} | ${LOTTO_DEFAULT_VALUE.MIN} | ${LOTTO_DEFAULT_VALUE.MAX} | ${LOTTO_DEFAULT_VALUE.LENGTH}
    ${LOTTO_DEFAULT_VALUE.MIN} | ${0}                       | ${LOTTO_DEFAULT_VALUE.LENGTH} | ${LOTTO_DEFAULT_VALUE.MIN} | ${LOTTO_DEFAULT_VALUE.MAX} | ${LOTTO_DEFAULT_VALUE.LENGTH}
    ${43}                      | ${1}                       | ${LOTTO_DEFAULT_VALUE.LENGTH} | ${LOTTO_DEFAULT_VALUE.MIN} | ${LOTTO_DEFAULT_VALUE.MAX} | ${LOTTO_DEFAULT_VALUE.LENGTH}
    ${1}                       | ${5}                       | ${LOTTO_DEFAULT_VALUE.LENGTH} | ${LOTTO_DEFAULT_VALUE.MIN} | ${LOTTO_DEFAULT_VALUE.MAX} | ${LOTTO_DEFAULT_VALUE.LENGTH}
    ${1}                       | ${6}                       | ${3}                          | ${1}                       | ${6}                       | ${3}
  `(
    "최소값: $min, 최대값: $max, 번호개수 : $length로 설정하면 LottoRules의 min,max,length는 각각 $expectedMin, $expectedMax $expectedLength 이다",
    ({ min, max, length, expectedMin, expectedMax, expectedLength }) => {
      const rule = new LottoTicketRules(min, max, length);

      expect(rule.max).toBe(expectedMax);
      expect(rule.min).toBe(expectedMin);
      expect(rule.length).toBe(expectedLength);
    },
  );
});
