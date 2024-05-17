import { Lotto } from "../src/domain/Lotto";
import { View } from "../src/views/view";

describe("출력 테스트", () => {
  test("구매한 로또 수와 로또 번호를 출력한다.", () => {
    // given
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([1, 2, 3, 4, 5, 7]);
    const logSpy = jest.spyOn(console, "log");

    // when
    View.outputBuyLog(2, [lotto1, lotto2]);

    // then
    expect(logSpy).toHaveBeenCalledWith(
      `2개를 구매했습니다.\n[1, 2, 3, 4, 5, 6]\n[1, 2, 3, 4, 5, 7]`
    );
  });
});
