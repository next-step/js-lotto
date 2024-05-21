import Lotto, { ERROR_MESSAGE_LOTTO_LENGTH } from "../src/domain/Lotto";

describe("로또에 관련된 테스트", () => {
  test("로또는 6자리로 입력이 가능하다. ", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    console.log("lotto.numbers", lotto.numbers);

    expect([1, 2, 3, 4, 5, 6]).toEqual(lotto.numbers);
  });

  test("로또가 6자리가 아닐 경우, 에러를 발생시킨다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR_MESSAGE_LOTTO_LENGTH);
  });
});
