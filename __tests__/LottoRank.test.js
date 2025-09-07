import { LottoRank } from "../src/domain/LottoRank.js";

describe(LottoRank.name, () => {
  it("객체 생성시 값이 올바르게 반환됩니다.", () => {
    const rank = LottoRank.of("first", 2000000000, 6);

    expect(rank.value.rankName).toBe("first");
    expect(rank.value.prize).toBe(2000000000);
    expect(rank.value.matchCount).toBe(6);
  });
});
