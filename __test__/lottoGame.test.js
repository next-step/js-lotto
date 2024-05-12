import { LottoGame } from "../src/js/domain/LottoGame";

describe("로또 게임 테스트", () => {
  test("사용자가 구매한 로또 번호와 당첨 번호를 비교한다.", () => {
    const lottoGame = new LottoGame([[1, 2, 3, 4, 5, 6]], [1, 2, 3, 4, 5, 7], 6);

    const result = lottoGame.result;

    expect(result.get(2)).toEqual(1);
  });
});
