import { LOTTO_PRIZE } from "../src/js/constants";
import { Lotto, LottoRank, WinningLotto } from "../src/js/domain";
import { TEST_LOTTO, TEST_LOTTOS } from "./constants";

let lottoRank;
let lottos;
let winningLotto;
beforeEach(() => {
  lottos = TEST_LOTTOS.map((lotto) => new Lotto(lotto));
  winningLotto = new WinningLotto(new Lotto(TEST_LOTTO), 7);
  lottoRank = new LottoRank(lottos, winningLotto);
});

describe("로또 결과 테스트", () => {
  test.each([
    {
      lottoNumbers: [15, 23, 12, 1, 34, 26],
      bonusNumber: 7,
      expected: LOTTO_PRIZE.FIRST.rank,
      description: "6개의 로또 번호가 일치하면 1등이다.",
    },
    {
      lottoNumbers: [7, 23, 12, 1, 34, 26],
      bonusNumber: 15,
      expected: LOTTO_PRIZE.SECOND.rank,
      description: "5개의 로또 번호와 보너스 번호가 일치하면 2등이다",
    },
    {
      lottoNumbers: [14, 23, 12, 1, 34, 26],
      bonusNumber: 7,
      expected: LOTTO_PRIZE.THIRD.rank,
      description: "5개의 로또 번호만 일치하면 3등이다.",
    },
    {
      lottoNumbers: [14, 22, 12, 1, 34, 26],
      bonusNumber: 7,
      expected: LOTTO_PRIZE.FOURTH.rank,
      description: "4개의 로또 번호만 일치하면 4등이다.",
    },
    {
      lottoNumbers: [14, 22, 11, 1, 34, 26],
      bonusNumber: 7,
      expected: LOTTO_PRIZE.FIFTH.rank,
      description: "3개의 로또 번호만 일치하면 5등이다.",
    },
  ])(`$description`, ({ lottoNumbers, bonusNumber, expected }) => {
    //given
    const winningLotto = new WinningLotto(new Lotto(lottoNumbers), bonusNumber);

    //when
    const lottoRanks = winningLotto.getRank(new Lotto(TEST_LOTTO));

    //then
    expect(lottoRanks).toBe(expected);
  });

  test("로또 당첨 횟수를 계산한다.", () => {
    //given

    //when
    const lottoRankCounts = lottoRank.getLottoRankCounts();
    const countsOverZero = lottoRankCounts
      .filter((prize) => prize.count > 0)
      .map((prize) => prize.rank);

    //then
    expect(countsOverZero).toContain(LOTTO_PRIZE.FIRST.rank);
    expect(countsOverZero).toContain(LOTTO_PRIZE.FIFTH.rank);
  });

  test("로또 수익률을 계산한다.", () => {
    //given
    const lottoRankCounts = lottoRank.getLottoRankCounts();

    //when
    const lottoReturn = lottoRank.calculateLottoReturn(lottoRankCounts);

    //then
    expect(lottoReturn).toBe(100);
  });
});
