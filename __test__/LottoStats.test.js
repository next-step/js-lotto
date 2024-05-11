import { LottoStats } from "../src/js/domain/LottoStats";
import { LottoRank } from "../src/js/domain/enum/LottoRank";

describe("로또 통계 테스트", () => {
  test("구입한 로또들의 등수를 받아 통계를 반환한다.", () => {
    //given
    const lottosRanks = [
      LottoRank.FIRST,
      LottoRank.FIRST,
      LottoRank.SECOND,
      LottoRank.THIRD,
      LottoRank.FIFTH,
      LottoRank.NOTHING,
    ];

    const totalReward = lottosRanks.reduce((a, { reward }) => a + reward, 0);

    //when
    const stats = new LottoStats(lottosRanks);

    //then
    expect(stats.totalCount).toBe(lottosRanks.length);
    expect(stats.totalReward).toBe(totalReward);
    expect(stats.rankCount.get(LottoRank.FIRST.rank)).toBe(2);
    expect(stats.rankCount.get(LottoRank.SECOND.rank)).toBe(1);
    expect(stats.rankCount.get(LottoRank.THIRD.rank)).toBe(1);
    expect(stats.rankCount.get(LottoRank.FIFTH.rank)).toBe(1);
    expect(stats.rankCount.get(LottoRank.NOTHING.rank)).toBe(1);
  });

  test("로또 등수가 아닌 다른 값이 들어오면 에러를 반환한다.", () => {
    //given
    const wrongLottoRanks = [{ rank: 5, reward: 5000 }];

    //when
    const whenWrongLottoRanks = () => new LottoStats(wrongLottoRanks);

    //then
    expect(whenWrongLottoRanks).toThrow();
  });
});
