import { ErrorLotto } from "../src/constants/error";
import Prize, { PRIZE } from "../src/domain/Prize";

describe("로또 당첨 기능", () => {
  test("5개의 번호가 일치하고, 보너스 번호가 일치하면 2등을 리턴한다", () => {
    // given
    const matchCount = 5;
    const isBonus = true;
    const expectRank = PRIZE.SECOND;

    const prize = new Prize();
    const rank = prize.findRank(matchCount, isBonus);

    expect(rank).toEqual(expectRank);
  });
  //1등부터 다양한 경우를 작성한다 반복적인 파라미터에 대한 테스트를 어케 작성할지
});
