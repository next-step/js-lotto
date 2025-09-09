import { Lotto } from "../src/domain/Lotto.js";
import { LottoNumber } from "../src/domain/LottoNumber.js";

describe(Lotto.name, () => {
  it("원소의 개수가 6개가 아닌 배열로 객체 생성시 에러가 발생합니다", () => {
    expect(() => Lotto.of([1, 2, 3, 4, 5])).toThrow(
      "로또 번호는 총 6개여야 합니다."
    );
    expect(() => Lotto.of([1, 2, 3, 4, 5, 6, 7])).toThrow(
      "로또 번호는 총 6개여야 합니다."
    );
  });

  it("1~45 사이의 중복되지 않는 숫자 6개를 전달하면 Lotto 객체가 에러없이 생성됩니다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = Lotto.of(numbers);

    expect(lotto.value).toHaveLength(6);
    for (let i = 0; i < lotto.value.length; i += 1) {
      expect(lotto.value[i].value === numbers[i]);
    }
  });

  it("contains: 로또에 포함된 번호와 그렇지 않은 번호를 구분합니다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = Lotto.of(numbers);

    expect(lotto.contains(new LottoNumber(3))).toBeTruthy();
    expect(lotto.contains(new LottoNumber(10))).toBeFalsy();
  });

  it("compare: 겹치는 번호 개수 반환", () => {
    const lottoA = Lotto.of([1, 2, 3, 4, 5, 6]);
    const lottoB = Lotto.of([4, 5, 6, 7, 8, 9]);

    expect(lottoA.compare(lottoB)).toBe(3);
  });
});
